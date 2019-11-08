package com.tosan.betting.web.rest;

import com.tosan.betting.domain.SystemSuggestion;
import com.tosan.betting.repository.SystemSuggestionRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.SystemSuggestion}.
 */
@RestController
@RequestMapping("/api")
public class SystemSuggestionResource {

    private final Logger log = LoggerFactory.getLogger(SystemSuggestionResource.class);

    private static final String ENTITY_NAME = "systemSuggestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemSuggestionRepository systemSuggestionRepository;

    public SystemSuggestionResource(SystemSuggestionRepository systemSuggestionRepository) {
        this.systemSuggestionRepository = systemSuggestionRepository;
    }

    /**
     * {@code POST  /system-suggestions} : Create a new systemSuggestion.
     *
     * @param systemSuggestion the systemSuggestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemSuggestion, or with status {@code 400 (Bad Request)} if the systemSuggestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-suggestions")
    public ResponseEntity<SystemSuggestion> createSystemSuggestion(@RequestBody SystemSuggestion systemSuggestion) throws URISyntaxException {
        log.debug("REST request to save SystemSuggestion : {}", systemSuggestion);
        if (systemSuggestion.getId() != null) {
            throw new BadRequestAlertException("A new systemSuggestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemSuggestion result = systemSuggestionRepository.save(systemSuggestion);
        return ResponseEntity.created(new URI("/api/system-suggestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-suggestions} : Updates an existing systemSuggestion.
     *
     * @param systemSuggestion the systemSuggestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemSuggestion,
     * or with status {@code 400 (Bad Request)} if the systemSuggestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemSuggestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-suggestions")
    public ResponseEntity<SystemSuggestion> updateSystemSuggestion(@RequestBody SystemSuggestion systemSuggestion) throws URISyntaxException {
        log.debug("REST request to update SystemSuggestion : {}", systemSuggestion);
        if (systemSuggestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemSuggestion result = systemSuggestionRepository.save(systemSuggestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemSuggestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-suggestions} : get all the systemSuggestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemSuggestions in body.
     */
    @GetMapping("/system-suggestions")
    public List<SystemSuggestion> getAllSystemSuggestions() {
        log.debug("REST request to get all SystemSuggestions");
        return systemSuggestionRepository.findAll();
    }

    /**
     * {@code GET  /system-suggestions/:id} : get the "id" systemSuggestion.
     *
     * @param id the id of the systemSuggestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemSuggestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-suggestions/{id}")
    public ResponseEntity<SystemSuggestion> getSystemSuggestion(@PathVariable Long id) {
        log.debug("REST request to get SystemSuggestion : {}", id);
        Optional<SystemSuggestion> systemSuggestion = systemSuggestionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemSuggestion);
    }

    /**
     * {@code DELETE  /system-suggestions/:id} : delete the "id" systemSuggestion.
     *
     * @param id the id of the systemSuggestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-suggestions/{id}")
    public ResponseEntity<Void> deleteSystemSuggestion(@PathVariable Long id) {
        log.debug("REST request to delete SystemSuggestion : {}", id);
        systemSuggestionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
