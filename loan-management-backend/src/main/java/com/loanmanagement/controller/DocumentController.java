package com.loanmanagement.controller;

import com.loanmanagement.dto.DocumentUploadResponse;
import com.loanmanagement.entity.Document;
import com.loanmanagement.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;
    
    @PostMapping("/upload/{loanApplicationId}")
    public ResponseEntity<?> uploadDocument(
            @PathVariable Long loanApplicationId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            
            // Validate file type (only allow common document formats)
            String contentType = file.getContentType();
            if (!isValidFileType(contentType)) {
                return ResponseEntity.badRequest().body("Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, PNG are allowed");
            }
            
            // Validate file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("File size exceeds 5MB limit");
            }
            
            Document document = documentService.saveDocument(file, documentType, loanApplicationId);
            
            // Convert to response DTO
            DocumentUploadResponse response = new DocumentUploadResponse(
                document.getId(),
                document.getFileName(),
                document.getOriginalName(),
                document.getFileType(),
                document.getFileSize(),
                document.getDocumentType(),
                document.getUploadDate(),
                document.getLoanApplication().getId()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Document upload failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/loan/{loanApplicationId}")
    public ResponseEntity<List<Document>> getDocumentsByLoanApplication(@PathVariable Long loanApplicationId) {
        List<Document> documents = documentService.getDocumentsByLoanApplication(loanApplicationId);
        return ResponseEntity.ok(documents);
    }
    
    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long documentId) {
        try {
            documentService.deleteDocument(documentId);
            return ResponseEntity.ok().body("Document deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete document: " + e.getMessage());
        }
    }
    
    @GetMapping("/types")
    public ResponseEntity<Map<String, String>> getDocumentTypes() {
        Map<String, String> documentTypes = Map.of(
            "ID_PROOF", "Identity Proof (Aadhar, PAN, Passport)",
            "INCOME_PROOF", "Income Proof (Salary Slip, ITR)",
            "ADDRESS_PROOF", "Address Proof (Utility Bill, Bank Statement)",
            "BANK_STATEMENT", "Bank Statement",
            "EMPLOYMENT_PROOF", "Employment Proof (Offer Letter, Experience Letter)",
            "OTHER", "Other Documents"
        );
        return ResponseEntity.ok(documentTypes);
    }
    
    private boolean isValidFileType(String contentType) {
        return contentType != null && (
            contentType.equals("application/pdf") ||
            contentType.equals("application/msword") ||
            contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
            contentType.equals("image/jpeg") ||
            contentType.equals("image/jpg") ||
            contentType.equals("image/png")
        );
    }
}
