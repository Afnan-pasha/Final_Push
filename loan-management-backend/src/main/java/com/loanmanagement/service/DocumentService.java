package com.loanmanagement.service;

import com.loanmanagement.entity.Document;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.repository.DocumentRepository;
import com.loanmanagement.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    private final String uploadDir = "uploads/documents/";
    
    public Document saveDocument(MultipartFile file, String documentType, Long loanApplicationId) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file to disk
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Get loan application
        LoanApplication loanApplication = loanApplicationRepository.findById(loanApplicationId)
            .orElseThrow(() -> new RuntimeException("Loan application not found"));
        
        // Create document entity
        Document document = new Document();
        document.setFileName(uniqueFilename);
        document.setOriginalName(originalFilename);
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setFilePath(filePath.toString());
        document.setDocumentType(documentType);
        document.setUploadDate(LocalDateTime.now());
        document.setLoanApplication(loanApplication);
        
        System.out.println("Saving document: " + document.getOriginalName() + " for loan: " + loanApplicationId);
        Document savedDocument = documentRepository.save(document);
        System.out.println("Document saved with ID: " + savedDocument.getId());
        
        return savedDocument;
    }
    
    public List<Document> getDocumentsByLoanApplication(Long loanApplicationId) {
        return documentRepository.findByLoanApplicationId(loanApplicationId);
    }
    
    public Document getDocumentById(Long documentId) {
        return documentRepository.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
    }
    
    public void deleteDocument(Long documentId) throws IOException {
        Document document = getDocumentById(documentId);
        
        // Delete file from disk
        Path filePath = Paths.get(document.getFilePath());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }
        
        // Delete from database
        documentRepository.delete(document);
    }
    
    public List<Document> getDocumentsByType(String documentType) {
        return documentRepository.findByDocumentType(documentType);
    }
    
    public List<Document> getDocumentsByLoanApplicationAndType(Long loanApplicationId, String documentType) {
        return documentRepository.findByLoanApplicationIdAndDocumentType(loanApplicationId, documentType);
    }
}
