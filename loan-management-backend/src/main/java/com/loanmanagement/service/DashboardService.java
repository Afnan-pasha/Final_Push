package com.loanmanagement.service;

import com.loanmanagement.dto.DashboardResponse;
import com.loanmanagement.dto.LoanApplicationResponse;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public DashboardResponse getDashboardData() {
        // Get loan statistics for all applications (since we don't have customer-specific data)
        long totalLoans = loanApplicationRepository.count();
        long approvedLoans = loanApplicationRepository.countByStatus(LoanApplication.LoanStatus.APPROVED);
        long pendingLoans = loanApplicationRepository.countByStatus(LoanApplication.LoanStatus.PENDING);
        
        // Calculate total approved amount
        BigDecimal totalApprovedAmount = loanApplicationRepository
            .findByStatus(LoanApplication.LoanStatus.APPROVED)
            .stream()
            .map(LoanApplication::getLoanAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Get unread notifications count
        long unreadNotifications = notificationService.getUnreadCount();
        
        // Create dashboard response
        DashboardResponse dashboard = new DashboardResponse(
            totalLoans, approvedLoans, pendingLoans, totalApprovedAmount, unreadNotifications
        );
        
        // Get recent loans (last 5)
        List<LoanApplication> recentLoansList = loanApplicationRepository
            .findTop5ByOrderByApplicationDateDesc();
        
        List<LoanApplicationResponse> recentLoans = recentLoansList.stream()
            .map(LoanApplicationResponse::new)
            .collect(Collectors.toList());
        
        dashboard.setRecentLoans(recentLoans);
        
        return dashboard;
    }
}
