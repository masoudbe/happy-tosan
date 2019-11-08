package com.tosan.betting.repository;

import com.tosan.betting.domain.SuggestionComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SuggestionComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuggestionCommentRepository extends JpaRepository<SuggestionComment, Long> {

    @Query("select suggestionComment from SuggestionComment suggestionComment where suggestionComment.user.login = ?#{principal.username}")
    List<SuggestionComment> findByUserIsCurrentUser();

}
