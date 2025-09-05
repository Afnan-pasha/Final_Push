package com.loanmanagement.controller;

import com.loanmanagement.dto.ExistingLoanRequest;
import com.loanmanagement.dto.ExistingLoanResponse;
import com.loanmanagement.service.ExistingLoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/existing-loans")
@CrossOrigin(origins = "*")
public class ExistingLoanController {

    @Autowired
    private ExistingLoanService existingLoanService;

    @PostMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> createExistingLoan(@PathVariable Long loanApplicationId,
                                                @Valid @RequestBody ExistingLoanRequest request) {
        try {
            ExistingLoanResponse response = existingLoanService.createExistingLoan(loanApplicationId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error creating existing loan: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> getExistingLoansByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            List<ExistingLoanResponse> existingLoans = existingLoanService.getExistingLoansByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok(existingLoans);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching existing loans: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExistingLoanById(@PathVariable Long id) {
        try {
            Optional<ExistingLoanResponse> existingLoan = existingLoanService.getExistingLoanById(id);
            if (existingLoan.isPresent()) {
                return ResponseEntity.ok(existingLoan.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching existing loan: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExistingLoan(@PathVariable Long id,
                                                @Valid @RequestBody ExistingLoanRequest request) {
        try {
            ExistingLoanResponse response = existingLoanService.updateExistingLoan(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error updating existing loan: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExistingLoan(@PathVariable Long id) {
        try {
            boolean deleted = existingLoanService.deleteExistingLoan(id);
            if (deleted) {
                return ResponseEntity.ok().body("Existing loan deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting existing loan: " + e.getMessage());
        }
    }

    @GetMapping("/loan/{loanApplicationId}/count")
    public ResponseEntity<?> countExistingLoansByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            long count = existingLoanService.countExistingLoansByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok().body(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error counting existing loans: " + e.getMessage());
        }
    }

    @GetMapping("/loan/{loanApplicationId}/summary")
    public ResponseEntity<?> getExistingLoansSummary(@PathVariable Long loanApplicationId) {
        try {
            long count = existingLoanService.countExistingLoansByLoanApplicationId(loanApplicationId);
            BigDecimal totalOutstanding = existingLoanService.getTotalOutstandingAmount(loanApplicationId);
            BigDecimal totalEmi = existingLoanService.getTotalEmi(loanApplicationId);

            Map<String, Object> summary = new HashMap<>();
            summary.put("count", count);
            summary.put("totalOutstandingAmount", totalOutstanding);
            summary.put("totalEmi", totalEmi);

            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting existing loans summary: " + e.getMessage());
        }
    }

    @DeleteMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> deleteAllExistingLoansByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            existingLoanService.deleteAllExistingLoansByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok().body("All existing loans deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting existing loans: " + e.getMessage());
        }
    }
}
