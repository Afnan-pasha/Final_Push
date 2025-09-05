package com.loanmanagement.service;

import com.loanmanagement.dto.LoanApplicationRequest;
import com.loanmanagement.dto.LoanApplicationResponse;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.entity.Notification;
import com.loanmanagement.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LoanApplicationService {
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public LoanApplicationResponse applyForLoan(LoanApplicationRequest request) {
        // Create new loan application
        LoanApplication loanApplication = new LoanApplication();
        loanApplication.setLoanType(request.getLoanType());
        loanApplication.setLoanAmount(request.getLoanAmount());
        loanApplication.setInterestRate(request.getInterestRate());
        loanApplication.setLoanTermMonths(request.getLoanTermMonths());
        loanApplication.setPurpose(request.getPurpose());
        loanApplication.setCollateral(request.getCollateral());
        
        // Calculate EMI and total amount
        calculateLoanDetails(loanApplication);
        
        // Save the loan application
        LoanApplication savedLoan = loanApplicationRepository.save(loanApplication);
        
        // Create notification for loan application
        notificationService.createNotification(
            "Loan Application Submitted",
            "Your loan application for " + request.getLoanType() + " of ₹" + 
            request.getLoanAmount() + " has been submitted successfully.",
            Notification.NotificationType.LOAN_APPLICATION
        );
        
        return new LoanApplicationResponse(savedLoan);
    }
    
    public List<LoanApplicationResponse> getAllLoans() {
        List<LoanApplication> loans = loanApplicationRepository.findAllByOrderByApplicationDateDesc();
        return loans.stream()
                   .map(LoanApplicationResponse::new)
                   .collect(Collectors.toList());
    }
    
    public Optional<LoanApplicationResponse> getLoanById(Long loanId) {
        Optional<LoanApplication> loan = loanApplicationRepository.findById(loanId);
        return loan.map(LoanApplicationResponse::new);
    }
    
    public boolean cancelLoanApplication(Long loanId) {
        Optional<LoanApplication> loanOpt = loanApplicationRepository.findById(loanId);
        if (loanOpt.isPresent()) {
            LoanApplication loan = loanOpt.get();
            if (loan.getStatus() == LoanApplication.LoanStatus.PENDING) {
                
                loan.setStatus(LoanApplication.LoanStatus.REJECTED);
                loan.setRejectionReason("Cancelled by customer");
                loanApplicationRepository.save(loan);
                
                // Create notification
                notificationService.createNotification(
                    "Loan Application Cancelled",
                    "Your loan application for " + loan.getLoanType() + " has been cancelled.",
                    Notification.NotificationType.LOAN_REJECTION
                );
                
                return true;
            }
        }
        return false;
    }
    
    public boolean deleteLoanApplication(Long loanId) {
        Optional<LoanApplication> loanOpt = loanApplicationRepository.findById(loanId);
        if (loanOpt.isPresent()) {
            LoanApplication loan = loanOpt.get();
            // Only allow deletion of PENDING or REJECTED loans
            if (loan.getStatus() == LoanApplication.LoanStatus.PENDING || 
                loan.getStatus() == LoanApplication.LoanStatus.REJECTED) {
                
                loanApplicationRepository.delete(loan);
                
                // Create notification
                notificationService.createNotification(
                    "Loan Application Deleted",
                    "Your loan application for " + loan.getLoanType() + " has been deleted.",
                    Notification.NotificationType.GENERAL
                );
                
                return true;
            }
        }
        return false;
    }
    
    public LoanApplicationResponse updateLoanStatus(Long loanId, LoanApplication.LoanStatus status, String reason) {
        Optional<LoanApplication> loanOpt = loanApplicationRepository.findById(loanId);
        if (loanOpt.isPresent()) {
            LoanApplication loan = loanOpt.get();
            loan.setStatus(status);
            
            if (status == LoanApplication.LoanStatus.APPROVED) {
                loan.setApprovalDate(LocalDateTime.now());
                notificationService.createNotification(
                    "Loan Approved!",
                    "Congratulations! Your loan application for " + loan.getLoanType() + 
                    " of ₹" + loan.getLoanAmount() + " has been approved.",
                    Notification.NotificationType.LOAN_APPROVAL
                );
            } else if (status == LoanApplication.LoanStatus.REJECTED) {
                loan.setRejectionReason(reason);
                notificationService.createNotification(
                    "Loan Application Rejected",
                    "Your loan application for " + loan.getLoanType() + " has been rejected. Reason: " + reason,
                    Notification.NotificationType.LOAN_REJECTION
                );
            } else if (status == LoanApplication.LoanStatus.DISBURSED) {
                notificationService.createNotification(
                    "Loan Disbursed",
                    "Your loan amount of ₹" + loan.getLoanAmount() + " has been disbursed to your account.",
                    Notification.NotificationType.LOAN_DISBURSEMENT
                );
            }
            
            LoanApplication savedLoan = loanApplicationRepository.save(loan);
            return new LoanApplicationResponse(savedLoan);
        }
        throw new RuntimeException("Loan application not found with id: " + loanId);
    }
    
    public BigDecimal calculateEMI(BigDecimal principal, BigDecimal annualRate, Integer termMonths) {
        if (principal.compareTo(BigDecimal.ZERO) <= 0 || 
            annualRate.compareTo(BigDecimal.ZERO) <= 0 || 
            termMonths <= 0) {
            return BigDecimal.ZERO;
        }
        
        // Convert annual rate to monthly rate
        BigDecimal monthlyRate = annualRate.divide(BigDecimal.valueOf(100 * 12), 10, RoundingMode.HALF_UP);
        
        // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
        BigDecimal onePlusR = BigDecimal.ONE.add(monthlyRate);
        BigDecimal onePlusRPowerN = onePlusR.pow(termMonths);
        
        BigDecimal numerator = principal.multiply(monthlyRate).multiply(onePlusRPowerN);
        BigDecimal denominator = onePlusRPowerN.subtract(BigDecimal.ONE);
        
        return numerator.divide(denominator, 2, RoundingMode.HALF_UP);
    }
    
    private void calculateLoanDetails(LoanApplication loan) {
        BigDecimal emi = calculateEMI(loan.getLoanAmount(), loan.getInterestRate(), loan.getLoanTermMonths());
        loan.setMonthlyEmi(emi);
        
        BigDecimal totalAmount = emi.multiply(BigDecimal.valueOf(loan.getLoanTermMonths()));
        loan.setTotalAmount(totalAmount);
    }
    
    public int cleanupDuplicateApplications() {
        List<LoanApplication> allLoans = loanApplicationRepository.findAllByOrderByApplicationDateDesc();
        
        // Group loans by similar criteria
        Map<String, List<LoanApplication>> groupedLoans = allLoans.stream()
            .collect(Collectors.groupingBy(loan -> 
                loan.getLoanType() + "-" + 
                loan.getLoanAmount() + "-" + 
                loan.getLoanTermMonths() + "-" + 
                loan.getApplicationDate().toLocalDate()
            ));
        
        int deletedCount = 0;
        
        // For each group, keep only the latest application
        for (Map.Entry<String, List<LoanApplication>> entry : groupedLoans.entrySet()) {
            List<LoanApplication> duplicates = entry.getValue();
            
            if (duplicates.size() > 1) {
                // Sort by application date (newest first)
                duplicates.sort((a, b) -> b.getApplicationDate().compareTo(a.getApplicationDate()));
                
                // Keep the first (newest) and delete the rest
                for (int i = 1; i < duplicates.size(); i++) {
                    LoanApplication toDelete = duplicates.get(i);
                    // Only delete if status is PENDING to avoid deleting processed applications
                    if (toDelete.getStatus() == LoanApplication.LoanStatus.PENDING) {
                        loanApplicationRepository.delete(toDelete);
                        deletedCount++;
                    }
                }
            }
        }
        
        return deletedCount;
    }
}
