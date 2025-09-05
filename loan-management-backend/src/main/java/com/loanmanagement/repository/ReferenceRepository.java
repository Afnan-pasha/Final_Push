package com.loanmanagement.repository;

import com.loanmanagement.entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    
    List<Reference> findByLoanApplicationId(Long loanApplicationId);
    
    @Query("SELECT r FROM Reference r WHERE r.loanApplication.id = :loanApplicationId ORDER BY r.createdAt DESC")
    List<Reference> findByLoanApplicationIdOrderByCreatedAtDesc(@Param("loanApplicationId") Long loanApplicationId);
    
    long countByLoanApplicationId(Long loanApplicationId);
    
    void deleteByLoanApplicationId(Long loanApplicationId);
}
