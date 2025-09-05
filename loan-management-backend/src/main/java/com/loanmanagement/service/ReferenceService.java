package com.loanmanagement.service;

import com.loanmanagement.dto.ReferenceRequest;
import com.loanmanagement.dto.ReferenceResponse;
import com.loanmanagement.entity.LoanApplication;
import com.loanmanagement.entity.Reference;
import com.loanmanagement.repository.LoanApplicationRepository;
import com.loanmanagement.repository.ReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReferenceService {
    
    @Autowired
    private ReferenceRepository referenceRepository;
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    public ReferenceResponse createReference(Long loanApplicationId, ReferenceRequest request) {
        Optional<LoanApplication> loanApplicationOpt = loanApplicationRepository.findById(loanApplicationId);
        if (loanApplicationOpt.isEmpty()) {
            throw new RuntimeException("Loan application not found with ID: " + loanApplicationId);
        }
        
        LoanApplication loanApplication = loanApplicationOpt.get();
        
        Reference reference = new Reference();
        reference.setLoanApplication(loanApplication);
        reference.setName(request.getName());
        reference.setRelationship(request.getRelationship());
        reference.setContactNumber(request.getContactNumber());
        reference.setAddress(request.getAddress());
        
        Reference savedReference = referenceRepository.save(reference);
        return new ReferenceResponse(savedReference);
    }
    
    public List<ReferenceResponse> getReferencesByLoanApplicationId(Long loanApplicationId) {
        List<Reference> references = referenceRepository.findByLoanApplicationIdOrderByCreatedAtDesc(loanApplicationId);
        return references.stream()
                .map(ReferenceResponse::new)
                .collect(Collectors.toList());
    }
    
    public Optional<ReferenceResponse> getReferenceById(Long id) {
        Optional<Reference> referenceOpt = referenceRepository.findById(id);
        return referenceOpt.map(ReferenceResponse::new);
    }
    
    public ReferenceResponse updateReference(Long id, ReferenceRequest request) {
        Optional<Reference> referenceOpt = referenceRepository.findById(id);
        if (referenceOpt.isEmpty()) {
            throw new RuntimeException("Reference not found with ID: " + id);
        }
        
        Reference reference = referenceOpt.get();
        reference.setName(request.getName());
        reference.setRelationship(request.getRelationship());
        reference.setContactNumber(request.getContactNumber());
        reference.setAddress(request.getAddress());
        
        Reference updatedReference = referenceRepository.save(reference);
        return new ReferenceResponse(updatedReference);
    }
    
    public boolean deleteReference(Long id) {
        try {
            if (referenceRepository.existsById(id)) {
                referenceRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.err.println("Error deleting reference with ID " + id + ": " + e.getMessage());
            return false;
        }
    }
    
    public long countReferencesByLoanApplicationId(Long loanApplicationId) {
        return referenceRepository.countByLoanApplicationId(loanApplicationId);
    }
    
    public void deleteAllReferencesByLoanApplicationId(Long loanApplicationId) {
        referenceRepository.deleteByLoanApplicationId(loanApplicationId);
    }
}
