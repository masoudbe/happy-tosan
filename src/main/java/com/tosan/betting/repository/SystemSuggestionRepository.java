package com.tosan.betting.repository;

import com.tosan.betting.domain.SystemSuggestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SystemSuggestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemSuggestionRepository extends JpaRepository<SystemSuggestion, Long> {

    @Query("select systemSuggestion from SystemSuggestion systemSuggestion where systemSuggestion.user.login = ?#{principal.username}")
    List<SystemSuggestion> findByUserIsCurrentUser();

}
