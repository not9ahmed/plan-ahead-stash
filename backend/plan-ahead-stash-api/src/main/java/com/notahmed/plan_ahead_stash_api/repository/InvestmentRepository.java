package com.notahmed.plan_ahead_stash_api.repository;

import com.notahmed.plan_ahead_stash_api.model.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    @Query("""
    SELECT i
    FROM Investment i
    WHERE i.endDate > CURRENT_DATE
    """)
    List<Investment> findAllActive();


    @Query("""
    SELECT i
    FROM Investment i
    WHERE i.currency = :currency
    """)
    List<Investment> findAllByCurrency(@Param("currency") String currency);
}
