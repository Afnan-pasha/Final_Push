package com.loanmanagement.dto;

import java.time.LocalDateTime;

public class DocumentUploadResponse {
    
    private Long id;
    private String fileName;
    private String originalName;
    private String fileType;
    private Long fileSize;
    private String documentType;
    private LocalDateTime uploadDate;
    private Long loanApplicationId;
    
    // Constructors
    public DocumentUploadResponse() {}
    
    public DocumentUploadResponse(Long id, String fileName, String originalName, 
                                String fileType, Long fileSize, String documentType, 
                                LocalDateTime uploadDate, Long loanApplicationId) {
        this.id = id;
        this.fileName = fileName;
        this.originalName = originalName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.documentType = documentType;
        this.uploadDate = uploadDate;
        this.loanApplicationId = loanApplicationId;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    
    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }
    
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
    
    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    
    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
    
    public Long getLoanApplicationId() { return loanApplicationId; }
    public void setLoanApplicationId(Long loanApplicationId) { this.loanApplicationId = loanApplicationId; }
}
