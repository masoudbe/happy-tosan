package com.tosan.betting.web.rest;

import com.tosan.betting.domain.SuggestionAccept;
import com.tosan.betting.repository.SuggestionAcceptRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.SuggestionAccept}.
 */
@RestController
@RequestMapping("/api")
public class SuggestionAcceptResource {

    private final Logger log = LoggerFactory.getLogger(SuggestionAcceptResource.class);

    private static final String ENTITY_NAME = "suggestionAccept";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuggestionAcceptRepository suggestionAcceptRepository;

    public SuggestionAcceptResource(SuggestionAcceptRepository suggestionAcceptRepository) {
        this.suggestionAcceptRepository = suggestionAcceptRepository;
    }

    /**
     * {@code POST  /suggestion-accepts} : Create a new suggestionAccept.
     *
     * @param suggestionAccept the suggestionAccept to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suggestionAccept, or with status {@code 400 (Bad Request)} if the suggestionAccept has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suggestion-accepts")
    public ResponseEntity<SuggestionAccept> createSuggestionAccept(@RequestBody SuggestionAccept suggestionAccept) throws URISyntaxException {
        log.debug("REST request to save SuggestionAccept : {}", suggestionAccept);
        if (suggestionAccept.getId() != null) {
            throw new BadRequestAlertException("A new suggestionAccept cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SuggestionAccept result = suggestionAcceptRepository.save(suggestionAccept);
        return ResponseEntity.created(new URI("/api/suggestion-accepts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suggestion-accepts} : Updates an existing suggestionAccept.
     *
     * @param suggestionAccept the suggestionAccept to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suggestionAccept,
     * or with status {@code 400 (Bad Request)} if the suggestionAccept is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suggestionAccept couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suggestion-accepts")
    public ResponseEntity<SuggestionAccept> updateSuggestionAccept(@RequestBody SuggestionAccept suggestionAccept) throws URISyntaxException {
        log.debug("REST request to update SuggestionAccept : {}", suggestionAccept);
        if (suggestionAccept.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SuggestionAccept result = suggestionAcceptRepository.save(suggestionAccept);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suggestionAccept.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /suggestion-accepts} : get all the suggestionAccepts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suggestionAccepts in body.
     */
    @GetMapping("/suggestion-accepts")
    public List<SuggestionAccept> getAllSuggestionAccepts() {
        log.debug("REST request to get all SuggestionAccepts");
        return suggestionAcceptRepository.findAll();
    }

    /**
     * {@code GET  /suggestion-accepts/:id} : get the "id" suggestionAccept.
     *
     * @param id the id of the suggestionAccept to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suggestionAccept, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suggestion-accepts/{id}")
    public ResponseEntity<SuggestionAccept> getSuggestionAccept(@PathVariable Long id) {
        log.debug("REST request to get SuggestionAccept : {}", id);
        Optional<SuggestionAccept> suggestionAccept = suggestionAcceptRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suggestionAccept);
    }

    /**
     * {@code DELETE  /suggestion-accepts/:id} : delete the "id" suggestionAccept.
     *
     * @param id the id of the suggestionAccept to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suggestion-accepts/{id}")
    public ResponseEntity<Void> deleteSuggestionAccept(@PathVariable Long id) {
        log.debug("REST request to delete SuggestionAccept : {}", id);
        suggestionAcceptRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
