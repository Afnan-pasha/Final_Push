package com.loanmanagement.dto;

import com.loanmanagement.entity.LoanApplication;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LoanApplicationResponse {
    
    private Long id;
    
    // Customer Details
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String userId;
    
    // Loan Details
    private String loanType;
    private BigDecimal loanAmount;
    private BigDecimal interestRate;
    private Integer loanTermMonths;
    private BigDecimal monthlyEmi;
    private BigDecimal totalAmount;
    private String status;
    private String purpose;
    private String collateral;
    private LocalDateTime applicationDate;
    private LocalDateTime approvalDate;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime submittedAt;
    
    // Constructors
    public LoanApplicationResponse() {}
    
    public LoanApplicationResponse(LoanApplication loan) {
        this.id = loan.getId();
        
        // Set customer details
        this.firstName = loan.getFirstName();
        this.middleName = loan.getMiddleName();
        this.lastName = loan.getLastName();
        this.phoneNumber = loan.getPhoneNumber();
        this.email = loan.getEmail();
        this.userId = loan.getUserId();
        
        // Set loan details
        this.loanType = loan.getLoanType();
        this.loanAmount = loan.getLoanAmount();
        this.interestRate = loan.getInterestRate();
        this.loanTermMonths = loan.getLoanTermMonths();
        this.monthlyEmi = loan.getMonthlyEmi();
        this.totalAmount = loan.getTotalAmount();
        this.status = loan.getStatus().toString();
        this.purpose = loan.getPurpose();
        this.collateral = loan.getCollateral();
        this.applicationDate = loan.getApplicationDate();
        this.approvalDate = loan.getApprovalDate();
        this.rejectionReason = loan.getRejectionReason();
        this.createdAt = loan.getCreatedAt();
        this.updatedAt = loan.getUpdatedAt();
        this.submittedAt = loan.getSubmittedAt();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    // Customer Details Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    // Loan Details Getters and Setters
    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }
    
    public BigDecimal getLoanAmount() { return loanAmount; }
    public void setLoanAmount(BigDecimal loanAmount) { this.loanAmount = loanAmount; }
    
    public BigDecimal getInterestRate() { return interestRate; }
    public void setInterestRate(BigDecimal interestRate) { this.interestRate = interestRate; }
    
    public Integer getLoanTermMonths() { return loanTermMonths; }
    public void setLoanTermMonths(Integer loanTermMonths) { this.loanTermMonths = loanTermMonths; }
    
    public BigDecimal getMonthlyEmi() { return monthlyEmi; }
    public void setMonthlyEmi(BigDecimal monthlyEmi) { this.monthlyEmi = monthlyEmi; }
    
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    
    public String getCollateral() { return collateral; }
    public void setCollateral(String collateral) { this.collateral = collateral; }
    
    public LocalDateTime getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDateTime applicationDate) { this.applicationDate = applicationDate; }
    
    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }
    
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    
    // Helper method to get full name
    public String getFullName() {
        StringBuilder fullName = new StringBuilder();
        if (firstName != null) fullName.append(firstName);
        if (middleName != null && !middleName.trim().isEmpty()) {
            if (fullName.length() > 0) fullName.append(" ");
            fullName.append(middleName);
        }
        if (lastName != null) {
            if (fullName.length() > 0) fullName.append(" ");
            fullName.append(lastName);
        }
        return fullName.toString();
    }
}
