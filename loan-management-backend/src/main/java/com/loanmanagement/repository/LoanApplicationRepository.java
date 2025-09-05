package com.loanmanagement.repository;

import com.loanmanagement.entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    
    // Find by status
    List<LoanApplication> findByStatus(LoanApplication.LoanStatus status);
    
    // Count by status
    long countByStatus(LoanApplication.LoanStatus status);
    
    // Find recent loans
    List<LoanApplication> findTop5ByOrderByApplicationDateDesc();
    
    // Find all ordered by date
    List<LoanApplication> findAllByOrderByApplicationDateDesc();
}
