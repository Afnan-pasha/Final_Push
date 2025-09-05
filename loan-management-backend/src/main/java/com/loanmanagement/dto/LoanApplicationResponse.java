package com.loanmanagement.dto;

import com.loanmanagement.entity.LoanApplication;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LoanApplicationResponse {
    
    private Long id;
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
    
    // Constructors
    public LoanApplicationResponse() {}
    
    public LoanApplicationResponse(LoanApplication loan) {
        this.id = loan.getId();
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
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
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
}
