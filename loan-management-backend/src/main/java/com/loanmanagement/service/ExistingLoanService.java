package com.loanmanagement.service;

import com.loanmanagement.dto.ExistingLoanRequest;
import com.loanmanagement.dto.ExistingLoanResponse;
import com.loanmanagement.entity.ExistingLoan;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.repository.ExistingLoanRepository;
import com.loanmanagement.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExistingLoanService {
    
    @Autowired
    private ExistingLoanRepository existingLoanRepository;
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    public ExistingLoanResponse createExistingLoan(Long loanApplicationId, ExistingLoanRequest request) {
        Optional<LoanApplication> loanApplicationOpt = loanApplicationRepository.findById(loanApplicationId);
        if (loanApplicationOpt.isEmpty()) {
            throw new RuntimeException("Loan application not found with ID: " + loanApplicationId);
        }
        
        LoanApplication loanApplication = loanApplicationOpt.get();
        
        ExistingLoan existingLoan = new ExistingLoan();
        existingLoan.setLoanApplication(loanApplication);
        existingLoan.setLoanType(request.getLoanType());
        existingLoan.setLender(request.getLender());
        existingLoan.setOutstandingAmount(request.getOutstandingAmount());
        existingLoan.setEmi(request.getEmi());
        existingLoan.setTenureMonths(request.getTenureMonths());
        existingLoan.setRemainingMonths(request.getRemainingMonths());
        
        ExistingLoan savedLoan = existingLoanRepository.save(existingLoan);
        return new ExistingLoanResponse(savedLoan);
    }
    
    public List<ExistingLoanResponse> getExistingLoansByLoanApplicationId(Long loanApplicationId) {
        List<ExistingLoan> existingLoans = existingLoanRepository.findByLoanApplicationIdOrderByCreatedAtDesc(loanApplicationId);
        return existingLoans.stream()
                .map(ExistingLoanResponse::new)
                .collect(Collectors.toList());
    }
    
    public Optional<ExistingLoanResponse> getExistingLoanById(Long id) {
        Optional<ExistingLoan> existingLoanOpt = existingLoanRepository.findById(id);
        return existingLoanOpt.map(ExistingLoanResponse::new);
    }
    
    public ExistingLoanResponse updateExistingLoan(Long id, ExistingLoanRequest request) {
        Optional<ExistingLoan> existingLoanOpt = existingLoanRepository.findById(id);
        if (existingLoanOpt.isEmpty()) {
            throw new RuntimeException("Existing loan not found with ID: " + id);
        }
        
        ExistingLoan existingLoan = existingLoanOpt.get();
        existingLoan.setLoanType(request.getLoanType());
        existingLoan.setLender(request.getLender());
        existingLoan.setOutstandingAmount(request.getOutstandingAmount());
        existingLoan.setEmi(request.getEmi());
        existingLoan.setTenureMonths(request.getTenureMonths());
        existingLoan.setRemainingMonths(request.getRemainingMonths());
        
        ExistingLoan updatedLoan = existingLoanRepository.save(existingLoan);
        return new ExistingLoanResponse(updatedLoan);
    }
    
    public boolean deleteExistingLoan(Long id) {
        try {
            if (existingLoanRepository.existsById(id)) {
                existingLoanRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.err.println("Error deleting existing loan with ID " + id + ": " + e.getMessage());
            return false;
        }
    }
    
    public long countExistingLoansByLoanApplicationId(Long loanApplicationId) {
        return existingLoanRepository.countByLoanApplicationId(loanApplicationId);
    }
    
    public BigDecimal getTotalOutstandingAmount(Long loanApplicationId) {
        BigDecimal total = existingLoanRepository.getTotalOutstandingAmountByLoanApplicationId(loanApplicationId);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalEmi(Long loanApplicationId) {
        BigDecimal total = existingLoanRepository.getTotalEmiByLoanApplicationId(loanApplicationId);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public void deleteAllExistingLoansByLoanApplicationId(Long loanApplicationId) {
        existingLoanRepository.deleteByLoanApplicationId(loanApplicationId);
    }
}
