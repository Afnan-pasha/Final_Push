package com.loanmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class ExistingLoanRequest {
    
    @NotBlank(message = "Loan type is required")
    @Size(max = 50, message = "Loan type cannot exceed 50 characters")
    private String loanType;
    
    @NotBlank(message = "Lender name is required")
    @Size(max = 100, message = "Lender name cannot exceed 100 characters")
    private String lender;
    
    @NotNull(message = "Outstanding amount is required")
    @Positive(message = "Outstanding amount must be positive")
    private BigDecimal outstandingAmount;
    
    @NotNull(message = "EMI amount is required")
    @Positive(message = "EMI amount must be positive")
    private BigDecimal emi;
    
    @NotNull(message = "Tenure is required")
    @Positive(message = "Tenure must be positive")
    private Integer tenureMonths;
    
    @NotNull(message = "Remaining tenure is required")
    private Integer remainingMonths;
    
    // Constructors
    public ExistingLoanRequest() {}
    
    public ExistingLoanRequest(String loanType, String lender, BigDecimal outstandingAmount, 
                              BigDecimal emi, Integer tenureMonths, Integer remainingMonths) {
        this.loanType = loanType;
        this.lender = lender;
        this.outstandingAmount = outstandingAmount;
        this.emi = emi;
        this.tenureMonths = tenureMonths;
        this.remainingMonths = remainingMonths;
    }
    
    // Getters and Setters
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
}
