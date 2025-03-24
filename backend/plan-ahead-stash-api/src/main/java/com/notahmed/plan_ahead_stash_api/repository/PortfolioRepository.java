package com.notahmed.plan_ahead_stash_api.repository;

import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    List<Portfolio> findAllByUserId(Long userId);

    // @Query("SELECT p from Portfolio p WHERE p.user.id = :userId")
    // List<Portfolio> findAllByUserId(@Param("userId") Long userId);


    List<Portfolio> findAllByName(String name);
}
