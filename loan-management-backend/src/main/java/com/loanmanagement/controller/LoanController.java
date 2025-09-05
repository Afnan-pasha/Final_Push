package com.loanmanagement.controller;

import com.loanmanagement.dto.LoanApplicationRequest;
import com.loanmanagement.dto.LoanApplicationResponse;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.service.LoanApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForLoan(@Valid @RequestBody LoanApplicationRequest request) {
        try {
            LoanApplicationResponse response = loanApplicationService.applyForLoan(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Loan application failed: " + e.getMessage());
        }
    }

    @GetMapping("/my-loans")
    public ResponseEntity<List<LoanApplicationResponse>> getMyLoans() {
        List<LoanApplicationResponse> loans = loanApplicationService.getAllLoans();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/{loanId}")
    public ResponseEntity<?> getLoanDetails(@PathVariable Long loanId) {
        Optional<LoanApplicationResponse> loan = loanApplicationService.getLoanById(loanId);

        if (loan.isPresent()) {
            return ResponseEntity.ok(loan.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{loanId}/status")
    public ResponseEntity<?> updateLoanStatus(@PathVariable Long loanId, @RequestBody StatusUpdateRequest request) {
        try {
            // Convert string to enum
            LoanApplication.LoanStatus status = LoanApplication.LoanStatus.valueOf(request.getStatus().toUpperCase());
            LoanApplicationResponse updatedLoan = loanApplicationService.updateLoanStatus(loanId, status, "Status updated via API");
            return ResponseEntity.ok(updatedLoan);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status: " + request.getStatus());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update loan status: " + e.getMessage());
        }
    }

    @DeleteMapping("/{loanId}")
    public ResponseEntity<?> deleteLoan(@PathVariable Long loanId) {
        try {
            boolean deleted = loanApplicationService.deleteLoanApplication(loanId);
            if (deleted) {
                return ResponseEntity.ok().body("Loan application deleted successfully");
            } else {
                return ResponseEntity.badRequest().body("Unable to delete loan application - loan may not exist or cannot be deleted");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete loan application: " + e.getMessage());
        }
    }

    @PostMapping("/cleanup-duplicates")
    public ResponseEntity<?> cleanupDuplicateApplications() {
        try {
            int deletedCount = loanApplicationService.cleanupDuplicateApplications();
            return ResponseEntity.ok().body("Cleaned up " + deletedCount + " duplicate applications");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to cleanup duplicates: " + e.getMessage());
        }
    }

    @PostMapping("/{loanId}/cancel")
    public ResponseEntity<?> cancelLoan(@PathVariable Long loanId) {
        boolean cancelled = loanApplicationService.cancelLoanApplication(loanId);

        if (cancelled) {
            return ResponseEntity.ok().body("Loan application cancelled successfully");
        } else {
            return ResponseEntity.badRequest().body("Unable to cancel loan application");
        }
    }

    @PostMapping("/calculate-emi")
    public ResponseEntity<?> calculateEMI(@RequestBody LoanApplicationRequest request) {
        try {
            BigDecimal emi = loanApplicationService.calculateEMI(
                    request.getLoanAmount(),
                    request.getInterestRate(),
                    request.getLoanTermMonths()
            );

            BigDecimal totalAmount = emi.multiply(BigDecimal.valueOf(request.getLoanTermMonths()));

            return ResponseEntity.ok().body(new EMICalculationResponse(emi, totalAmount));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("EMI calculation failed: " + e.getMessage());
        }
    }

    // Inner class for EMI calculation response
    public static class EMICalculationResponse {
        private BigDecimal monthlyEmi;
        private BigDecimal totalAmount;

        public EMICalculationResponse(BigDecimal monthlyEmi, BigDecimal totalAmount) {
            this.monthlyEmi = monthlyEmi;
            this.totalAmount = totalAmount;
        }

        public BigDecimal getMonthlyEmi() { return monthlyEmi; }
        public void setMonthlyEmi(BigDecimal monthlyEmi) { this.monthlyEmi = monthlyEmi; }

        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    }

    // Inner class for status update request
    public static class StatusUpdateRequest {
        private String status;

        public StatusUpdateRequest() {}

        public StatusUpdateRequest(String status) {
            this.status = status;
        }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
