package com.tosan.betting.repository;

import com.tosan.betting.domain.SystemSuggestionComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SystemSuggestionComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemSuggestionCommentRepository extends JpaRepository<SystemSuggestionComment, Long> {

    @Query("select systemSuggestionComment from SystemSuggestionComment systemSuggestionComment where systemSuggestionComment.user.login = ?#{principal.username}")
    List<SystemSuggestionComment> findByUserIsCurrentUser();

}
