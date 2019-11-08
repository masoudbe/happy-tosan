package com.tosan.betting.repository;

import com.tosan.betting.domain.SystemSuggestionAccept;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SystemSuggestionAccept entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemSuggestionAcceptRepository extends JpaRepository<SystemSuggestionAccept, Long> {

    @Query("select systemSuggestionAccept from SystemSuggestionAccept systemSuggestionAccept where systemSuggestionAccept.user.login = ?#{principal.username}")
    List<SystemSuggestionAccept> findByUserIsCurrentUser();

}
