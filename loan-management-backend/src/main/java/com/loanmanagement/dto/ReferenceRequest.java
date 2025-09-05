package com.loanmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ReferenceRequest {
    
    @NotBlank(message = "Reference name is required")
    @Size(max = 100, message = "Reference name cannot exceed 100 characters")
    private String name;
    
    @NotBlank(message = "Relationship is required")
    @Size(max = 50, message = "Relationship cannot exceed 50 characters")
    private String relationship;
    
    @NotBlank(message = "Contact number is required")
    @Size(max = 15, message = "Contact number cannot exceed 15 characters")
    private String contactNumber;
    
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;
    
    // Constructors
    public ReferenceRequest() {}
    
    public ReferenceRequest(String name, String relationship, String contactNumber, String address) {
        this.name = name;
        this.relationship = relationship;
        this.contactNumber = contactNumber;
        this.address = address;
    }
    
    // Getters and Setters
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
}
