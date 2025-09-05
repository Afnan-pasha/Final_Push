package com.loanmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "existing_loans")
public class ExistingLoan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_application_id", nullable = false)
    private LoanApplication loanApplication;
    
    @NotBlank(message = "Loan type is required")
    @Size(max = 50, message = "Loan type cannot exceed 50 characters")
    @Column(name = "loan_type", nullable = false, length = 50)
    private String loanType;
    
    @NotBlank(message = "Lender name is required")
    @Size(max = 100, message = "Lender name cannot exceed 100 characters")
    @Column(name = "lender", nullable = false, length = 100)
    private String lender;
    
    @NotNull(message = "Outstanding amount is required")
    @Positive(message = "Outstanding amount must be positive")
    @Column(name = "outstanding_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal outstandingAmount;
    
    @NotNull(message = "EMI amount is required")
    @Positive(message = "EMI amount must be positive")
    @Column(name = "emi", nullable = false, precision = 10, scale = 2)
    private BigDecimal emi;
    
    @NotNull(message = "Tenure is required")
    @Positive(message = "Tenure must be positive")
    @Column(name = "tenure_months", nullable = false)
    private Integer tenureMonths;
    
    @NotNull(message = "Remaining tenure is required")
    @Column(name = "remaining_months", nullable = false)
    private Integer remainingMonths;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public ExistingLoan() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public ExistingLoan(String loanType, String lender, BigDecimal outstandingAmount, 
                       BigDecimal emi, Integer tenureMonths, Integer remainingMonths) {
        this();
        this.loanType = loanType;
        this.lender = lender;
        this.outstandingAmount = outstandingAmount;
        this.emi = emi;
        this.tenureMonths = tenureMonths;
        this.remainingMonths = remainingMonths;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
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
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
