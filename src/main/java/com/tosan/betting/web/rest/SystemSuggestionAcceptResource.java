package com.tosan.betting.web.rest;

import com.tosan.betting.domain.SystemSuggestionAccept;
import com.tosan.betting.repository.SystemSuggestionAcceptRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.SystemSuggestionAccept}.
 */
@RestController
@RequestMapping("/api")
public class SystemSuggestionAcceptResource {

    private final Logger log = LoggerFactory.getLogger(SystemSuggestionAcceptResource.class);

    private static final String ENTITY_NAME = "systemSuggestionAccept";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemSuggestionAcceptRepository systemSuggestionAcceptRepository;

    public SystemSuggestionAcceptResource(SystemSuggestionAcceptRepository systemSuggestionAcceptRepository) {
        this.systemSuggestionAcceptRepository = systemSuggestionAcceptRepository;
    }

    /**
     * {@code POST  /system-suggestion-accepts} : Create a new systemSuggestionAccept.
     *
     * @param systemSuggestionAccept the systemSuggestionAccept to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemSuggestionAccept, or with status {@code 400 (Bad Request)} if the systemSuggestionAccept has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-suggestion-accepts")
    public ResponseEntity<SystemSuggestionAccept> createSystemSuggestionAccept(@RequestBody SystemSuggestionAccept systemSuggestionAccept) throws URISyntaxException {
        log.debug("REST request to save SystemSuggestionAccept : {}", systemSuggestionAccept);
        if (systemSuggestionAccept.getId() != null) {
            throw new BadRequestAlertException("A new systemSuggestionAccept cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemSuggestionAccept result = systemSuggestionAcceptRepository.save(systemSuggestionAccept);
        return ResponseEntity.created(new URI("/api/system-suggestion-accepts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-suggestion-accepts} : Updates an existing systemSuggestionAccept.
     *
     * @param systemSuggestionAccept the systemSuggestionAccept to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemSuggestionAccept,
     * or with status {@code 400 (Bad Request)} if the systemSuggestionAccept is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemSuggestionAccept couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-suggestion-accepts")
    public ResponseEntity<SystemSuggestionAccept> updateSystemSuggestionAccept(@RequestBody SystemSuggestionAccept systemSuggestionAccept) throws URISyntaxException {
        log.debug("REST request to update SystemSuggestionAccept : {}", systemSuggestionAccept);
        if (systemSuggestionAccept.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemSuggestionAccept result = systemSuggestionAcceptRepository.save(systemSuggestionAccept);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemSuggestionAccept.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-suggestion-accepts} : get all the systemSuggestionAccepts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemSuggestionAccepts in body.
     */
    @GetMapping("/system-suggestion-accepts")
    public List<SystemSuggestionAccept> getAllSystemSuggestionAccepts() {
        log.debug("REST request to get all SystemSuggestionAccepts");
        return systemSuggestionAcceptRepository.findAll();
    }

    /**
     * {@code GET  /system-suggestion-accepts/:id} : get the "id" systemSuggestionAccept.
     *
     * @param id the id of the systemSuggestionAccept to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemSuggestionAccept, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-suggestion-accepts/{id}")
    public ResponseEntity<SystemSuggestionAccept> getSystemSuggestionAccept(@PathVariable Long id) {
        log.debug("REST request to get SystemSuggestionAccept : {}", id);
        Optional<SystemSuggestionAccept> systemSuggestionAccept = systemSuggestionAcceptRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemSuggestionAccept);
    }

    /**
     * {@code DELETE  /system-suggestion-accepts/:id} : delete the "id" systemSuggestionAccept.
     *
     * @param id the id of the systemSuggestionAccept to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-suggestion-accepts/{id}")
    public ResponseEntity<Void> deleteSystemSuggestionAccept(@PathVariable Long id) {
        log.debug("REST request to delete SystemSuggestionAccept : {}", id);
        systemSuggestionAcceptRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
