package com.loanmanagement.repository;

import com.loanmanagement.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    List<Document> findByLoanApplicationId(Long loanApplicationId);
    
    List<Document> findByDocumentType(String documentType);
    
    @Query("SELECT d FROM Document d WHERE d.loanApplication.id = :loanApplicationId AND d.documentType = :documentType")
    List<Document> findByLoanApplicationIdAndDocumentType(@Param("loanApplicationId") Long loanApplicationId, 
                                                         @Param("documentType") String documentType);
    
    void deleteByLoanApplicationId(Long loanApplicationId);
}
