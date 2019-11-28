package com.tosan.betting.web.rest;

import com.tosan.betting.domain.Suggestion;
import com.tosan.betting.domain.SuggestionComment;
import com.tosan.betting.repository.SuggestionCommentRepository;
import com.tosan.betting.security.SecurityUtils;
import com.tosan.betting.service.UserService;
import com.tosan.betting.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.mapstruct.ap.shaded.freemarker.template.utility.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tosan.betting.domain.SuggestionComment}.
 */
@RestController
@RequestMapping("/api")
public class SuggestionCommentResource {

    private final Logger log = LoggerFactory.getLogger(SuggestionCommentResource.class);

    private static final String ENTITY_NAME = "suggestionComment";

    private final UserService userService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuggestionCommentRepository suggestionCommentRepository;

    public SuggestionCommentResource(SuggestionCommentRepository suggestionCommentRepository, UserService userService) {
        this.suggestionCommentRepository = suggestionCommentRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /suggestion-comments} : Create a new suggestionComment.
     *
     * @param suggestionComment the suggestionComment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suggestionComment, or with status {@code 400 (Bad Request)} if the suggestionComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suggestion-comments")
    public ResponseEntity<SuggestionComment> createSuggestionComment(@RequestBody SuggestionComment suggestionComment) throws URISyntaxException {
        log.debug("REST request to save SuggestionComment : {}", suggestionComment);
        if (suggestionComment.getId() != null) {
            throw new BadRequestAlertException("A new suggestionComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        suggestionComment.setDate(LocalDate.now());
        suggestionComment.setUser(userService.getUserWithAuthorities().get());
        SuggestionComment result = suggestionCommentRepository.save(suggestionComment);
        return ResponseEntity.created(new URI("/api/suggestion-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suggestion-comments} : Updates an existing suggestionComment.
     *
     * @param suggestionComment the suggestionComment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suggestionComment,
     * or with status {@code 400 (Bad Request)} if the suggestionComment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suggestionComment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suggestion-comments")
    public ResponseEntity<SuggestionComment> updateSuggestionComment(@RequestBody SuggestionComment suggestionComment) throws URISyntaxException {
        log.debug("REST request to update SuggestionComment : {}", suggestionComment);
        if (suggestionComment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SuggestionComment result = suggestionCommentRepository.save(suggestionComment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suggestionComment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /suggestion-comments} : get all the suggestionComments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suggestionComments in body.
     */
    @GetMapping("/suggestion-comments")
    public List<SuggestionComment> getAllSuggestionComments() {
        log.debug("REST request to get all SuggestionComments");
        return suggestionCommentRepository.findAll();
    }

    /**
     * {@code GET  /suggestion-comments/:id} : get the "id" suggestionComment.
     *
     * @param id the id of the suggestionComment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suggestionComment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suggestion-comments/{id}")
    public ResponseEntity<SuggestionComment> getSuggestionComment(@PathVariable Long id) {
        log.debug("REST request to get SuggestionComment : {}", id);
        Optional<SuggestionComment> suggestionComment = suggestionCommentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suggestionComment);
    }

    @GetMapping("/suggestion-comments/{id}/{findBy}")
    public List<SuggestionComment> getSuggestionComment(@PathVariable Long id, @PathVariable String findBy) {
        log.debug("REST request to get SuggestionComment : {}", id);
        if(findBy.compareTo("suggestion") == 0){
            Suggestion sg = new Suggestion();
            sg.setId(id);
            return suggestionCommentRepository.findBySuggestion(sg);
        }

        return null;
    }

    /**
     * {@code DELETE  /suggestion-comments/:id} : delete the "id" suggestionComment.
     *
     * @param id the id of the suggestionComment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suggestion-comments/{id}")
    public ResponseEntity<Void> deleteSuggestionComment(@PathVariable Long id) {
        log.debug("REST request to delete SuggestionComment : {}", id);
        suggestionCommentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
