package com.loanmanagement.dto;

import com.loanmanagement.entity.ExistingLoan;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ExistingLoanResponse {
    
    private Long id;
    private Long loanApplicationId;
    private String loanType;
    private String lender;
    private BigDecimal outstandingAmount;
    private BigDecimal emi;
    private Integer tenureMonths;
    private Integer remainingMonths;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public ExistingLoanResponse() {}
    
    public ExistingLoanResponse(ExistingLoan existingLoan) {
        this.id = existingLoan.getId();
        this.loanApplicationId = existingLoan.getLoanApplication().getId();
        this.loanType = existingLoan.getLoanType();
        this.lender = existingLoan.getLender();
        this.outstandingAmount = existingLoan.getOutstandingAmount();
        this.emi = existingLoan.getEmi();
        this.tenureMonths = existingLoan.getTenureMonths();
        this.remainingMonths = existingLoan.getRemainingMonths();
        this.createdAt = existingLoan.getCreatedAt();
        this.updatedAt = existingLoan.getUpdatedAt();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
    
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }
    
    public String getLoanType() {
        return loanType;
    }
    
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
    
    public String getLender() {
        return lender;
    }
    
    public void setLender(String lender) {
        this.lender = lender;
    }
    
    public BigDecimal getOutstandingAmount() {
        return outstandingAmount;
    }
    
    public void setOutstandingAmount(BigDecimal outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }
    
    public BigDecimal getEmi() {
        return emi;
    }
    
    public void setEmi(BigDecimal emi) {
        this.emi = emi;
    }
    
    public Integer getTenureMonths() {
        return tenureMonths;
    }
    
    public void setTenureMonths(Integer tenureMonths) {
        this.tenureMonths = tenureMonths;
    }
    
    public Integer getRemainingMonths() {
        return remainingMonths;
    }
    
    public void setRemainingMonths(Integer remainingMonths) {
        this.remainingMonths = remainingMonths;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
