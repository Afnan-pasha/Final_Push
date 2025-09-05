package com.loanmanagement.dto;

import com.loanmanagement.entity.Reference;
import java.time.LocalDateTime;

public class ReferenceResponse {
    
    private Long id;
    private Long loanApplicationId;
    private String name;
    private String relationship;
    private String contactNumber;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public ReferenceResponse() {}
    
    public ReferenceResponse(Reference reference) {
        this.id = reference.getId();
        this.loanApplicationId = reference.getLoanApplication().getId();
        this.name = reference.getName();
        this.relationship = reference.getRelationship();
        this.contactNumber = reference.getContactNumber();
        this.address = reference.getAddress();
        this.createdAt = reference.getCreatedAt();
        this.updatedAt = reference.getUpdatedAt();
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
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getRelationship() {
        return relationship;
    }
    
    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
    
    public String getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
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
