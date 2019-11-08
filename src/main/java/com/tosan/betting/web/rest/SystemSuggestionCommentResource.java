package com.tosan.betting.web.rest;

import com.tosan.betting.domain.SystemSuggestionComment;
import com.tosan.betting.repository.SystemSuggestionCommentRepository;
import com.tosan.betting.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tosan.betting.domain.SystemSuggestionComment}.
 */
@RestController
@RequestMapping("/api")
public class SystemSuggestionCommentResource {

    private final Logger log = LoggerFactory.getLogger(SystemSuggestionCommentResource.class);

    private static final String ENTITY_NAME = "systemSuggestionComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemSuggestionCommentRepository systemSuggestionCommentRepository;

    public SystemSuggestionCommentResource(SystemSuggestionCommentRepository systemSuggestionCommentRepository) {
        this.systemSuggestionCommentRepository = systemSuggestionCommentRepository;
    }

    /**
     * {@code POST  /system-suggestion-comments} : Create a new systemSuggestionComment.
     *
     * @param systemSuggestionComment the systemSuggestionComment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemSuggestionComment, or with status {@code 400 (Bad Request)} if the systemSuggestionComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-suggestion-comments")
    public ResponseEntity<SystemSuggestionComment> createSystemSuggestionComment(@RequestBody SystemSuggestionComment systemSuggestionComment) throws URISyntaxException {
        log.debug("REST request to save SystemSuggestionComment : {}", systemSuggestionComment);
        if (systemSuggestionComment.getId() != null) {
            throw new BadRequestAlertException("A new systemSuggestionComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemSuggestionComment result = systemSuggestionCommentRepository.save(systemSuggestionComment);
        return ResponseEntity.created(new URI("/api/system-suggestion-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-suggestion-comments} : Updates an existing systemSuggestionComment.
     *
     * @param systemSuggestionComment the systemSuggestionComment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemSuggestionComment,
     * or with status {@code 400 (Bad Request)} if the systemSuggestionComment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemSuggestionComment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-suggestion-comments")
    public ResponseEntity<SystemSuggestionComment> updateSystemSuggestionComment(@RequestBody SystemSuggestionComment systemSuggestionComment) throws URISyntaxException {
        log.debug("REST request to update SystemSuggestionComment : {}", systemSuggestionComment);
        if (systemSuggestionComment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemSuggestionComment result = systemSuggestionCommentRepository.save(systemSuggestionComment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemSuggestionComment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-suggestion-comments} : get all the systemSuggestionComments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemSuggestionComments in body.
     */
    @GetMapping("/system-suggestion-comments")
    public List<SystemSuggestionComment> getAllSystemSuggestionComments() {
        log.debug("REST request to get all SystemSuggestionComments");
        return systemSuggestionCommentRepository.findAll();
    }

    /**
     * {@code GET  /system-suggestion-comments/:id} : get the "id" systemSuggestionComment.
     *
     * @param id the id of the systemSuggestionComment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemSuggestionComment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-suggestion-comments/{id}")
    public ResponseEntity<SystemSuggestionComment> getSystemSuggestionComment(@PathVariable Long id) {
        log.debug("REST request to get SystemSuggestionComment : {}", id);
        Optional<SystemSuggestionComment> systemSuggestionComment = systemSuggestionCommentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemSuggestionComment);
    }

    /**
     * {@code DELETE  /system-suggestion-comments/:id} : delete the "id" systemSuggestionComment.
     *
     * @param id the id of the systemSuggestionComment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-suggestion-comments/{id}")
    public ResponseEntity<Void> deleteSystemSuggestionComment(@PathVariable Long id) {
        log.debug("REST request to delete SystemSuggestionComment : {}", id);
        systemSuggestionCommentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
