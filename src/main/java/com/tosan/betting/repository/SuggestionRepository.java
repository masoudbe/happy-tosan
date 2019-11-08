package com.tosan.betting.repository;

import com.tosan.betting.domain.Suggestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Suggestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    @Query("select suggestion from Suggestion suggestion where suggestion.user.login = ?#{principal.username}")
    List<Suggestion> findByUserIsCurrentUser();

}
