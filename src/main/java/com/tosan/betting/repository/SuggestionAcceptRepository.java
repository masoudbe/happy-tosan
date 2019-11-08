package com.tosan.betting.repository;

import com.tosan.betting.domain.SuggestionAccept;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SuggestionAccept entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuggestionAcceptRepository extends JpaRepository<SuggestionAccept, Long> {

    @Query("select suggestionAccept from SuggestionAccept suggestionAccept where suggestionAccept.user.login = ?#{principal.username}")
    List<SuggestionAccept> findByUserIsCurrentUser();

}
