package com.loanmanagement.controller;

import com.loanmanagement.dto.ReferenceRequest;
import com.loanmanagement.dto.ReferenceResponse;
import com.loanmanagement.service.ReferenceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/references")
@CrossOrigin(origins = "*")
public class ReferenceController {

    @Autowired
    private ReferenceService referenceService;

    @PostMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> createReference(@PathVariable Long loanApplicationId,
                                             @Valid @RequestBody ReferenceRequest request) {
        try {
            ReferenceResponse response = referenceService.createReference(loanApplicationId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error creating reference: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> getReferencesByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            List<ReferenceResponse> references = referenceService.getReferencesByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok(references);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching references: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReferenceById(@PathVariable Long id) {
        try {
            Optional<ReferenceResponse> reference = referenceService.getReferenceById(id);
            if (reference.isPresent()) {
                return ResponseEntity.ok(reference.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching reference: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReference(@PathVariable Long id,
                                             @Valid @RequestBody ReferenceRequest request) {
        try {
            ReferenceResponse response = referenceService.updateReference(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error updating reference: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReference(@PathVariable Long id) {
        try {
            boolean deleted = referenceService.deleteReference(id);
            if (deleted) {
                return ResponseEntity.ok().body("Reference deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting reference: " + e.getMessage());
        }
    }

    @GetMapping("/loan/{loanApplicationId}/count")
    public ResponseEntity<?> countReferencesByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            long count = referenceService.countReferencesByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok().body(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error counting references: " + e.getMessage());
        }
    }

    @DeleteMapping("/loan/{loanApplicationId}")
    public ResponseEntity<?> deleteAllReferencesByLoanApplication(@PathVariable Long loanApplicationId) {
        try {
            referenceService.deleteAllReferencesByLoanApplicationId(loanApplicationId);
            return ResponseEntity.ok().body("All references deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting references: " + e.getMessage());
        }
    }
}
