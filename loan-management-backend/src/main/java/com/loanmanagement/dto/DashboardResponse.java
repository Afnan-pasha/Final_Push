package com.loanmanagement.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardResponse {
    
    private long totalLoans;
    private long approvedLoans;
    private long pendingLoans;
    private BigDecimal totalApprovedAmount;
    private long unreadNotifications;
    private List<LoanApplicationResponse> recentLoans;
    private CustomerProfileSummary customerProfile;
    
    // Constructors
    public DashboardResponse() {}
    
    public DashboardResponse(long totalLoans, long approvedLoans, long pendingLoans, 
                           BigDecimal totalApprovedAmount, long unreadNotifications) {
        this.totalLoans = totalLoans;
        this.approvedLoans = approvedLoans;
        this.pendingLoans = pendingLoans;
        this.totalApprovedAmount = totalApprovedAmount;
        this.unreadNotifications = unreadNotifications;
    }
    
    // Getters and Setters
    public long getTotalLoans() { return totalLoans; }
    public void setTotalLoans(long totalLoans) { this.totalLoans = totalLoans; }
    
    public long getApprovedLoans() { return approvedLoans; }
    public void setApprovedLoans(long approvedLoans) { this.approvedLoans = approvedLoans; }
    
    public long getPendingLoans() { return pendingLoans; }
    public void setPendingLoans(long pendingLoans) { this.pendingLoans = pendingLoans; }
    
    public BigDecimal getTotalApprovedAmount() { return totalApprovedAmount; }
    public void setTotalApprovedAmount(BigDecimal totalApprovedAmount) { this.totalApprovedAmount = totalApprovedAmount; }
    
    public long getUnreadNotifications() { return unreadNotifications; }
    public void setUnreadNotifications(long unreadNotifications) { this.unreadNotifications = unreadNotifications; }
    
    public List<LoanApplicationResponse> getRecentLoans() { return recentLoans; }
    public void setRecentLoans(List<LoanApplicationResponse> recentLoans) { this.recentLoans = recentLoans; }
    
    public CustomerProfileSummary getCustomerProfile() { return customerProfile; }
    public void setCustomerProfile(CustomerProfileSummary customerProfile) { this.customerProfile = customerProfile; }
    
    // Inner class for customer profile summary
    public static class CustomerProfileSummary {
        private String firstName;
        private String lastName;
        private String email;
        private Double annualIncome;
        private Integer creditScore;
        private String employmentStatus;
        
        public CustomerProfileSummary() {}
        
        public CustomerProfileSummary(String firstName, String lastName, String email, 
                                    Double annualIncome, Integer creditScore, String employmentStatus) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.annualIncome = annualIncome;
            this.creditScore = creditScore;
            this.employmentStatus = employmentStatus;
        }
        
        // Getters and Setters
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public Double getAnnualIncome() { return annualIncome; }
        public void setAnnualIncome(Double annualIncome) { this.annualIncome = annualIncome; }
        
        public Integer getCreditScore() { return creditScore; }
        public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
        
        public String getEmploymentStatus() { return employmentStatus; }
        public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
    }
}
