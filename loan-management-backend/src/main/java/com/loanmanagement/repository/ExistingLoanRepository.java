package com.loanmanagement.repository;

import com.loanmanagement.entity.ExistingLoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ExistingLoanRepository extends JpaRepository<ExistingLoan, Long> {
    
    List<ExistingLoan> findByLoanApplicationId(Long loanApplicationId);
    
    @Query("SELECT e FROM ExistingLoan e WHERE e.loanApplication.id = :loanApplicationId ORDER BY e.createdAt DESC")
    List<ExistingLoan> findByLoanApplicationIdOrderByCreatedAtDesc(@Param("loanApplicationId") Long loanApplicationId);
    
    long countByLoanApplicationId(Long loanApplicationId);
    
    @Query("SELECT SUM(e.outstandingAmount) FROM ExistingLoan e WHERE e.loanApplication.id = :loanApplicationId")
    BigDecimal getTotalOutstandingAmountByLoanApplicationId(@Param("loanApplicationId") Long loanApplicationId);
    
    @Query("SELECT SUM(e.emi) FROM ExistingLoan e WHERE e.loanApplication.id = :loanApplicationId")
    BigDecimal getTotalEmiByLoanApplicationId(@Param("loanApplicationId") Long loanApplicationId);
    
    void deleteByLoanApplicationId(Long loanApplicationId);
}
