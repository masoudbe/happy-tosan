package com.tosan.betting.web.rest;

import com.tosan.betting.domain.SystemSuggestionDiscount;
import com.tosan.betting.repository.SystemSuggestionDiscountRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.SystemSuggestionDiscount}.
 */
@RestController
@RequestMapping("/api")
public class SystemSuggestionDiscountResource {

    private final Logger log = LoggerFactory.getLogger(SystemSuggestionDiscountResource.class);

    private static final String ENTITY_NAME = "systemSuggestionDiscount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemSuggestionDiscountRepository systemSuggestionDiscountRepository;

    public SystemSuggestionDiscountResource(SystemSuggestionDiscountRepository systemSuggestionDiscountRepository) {
        this.systemSuggestionDiscountRepository = systemSuggestionDiscountRepository;
    }

    /**
     * {@code POST  /system-suggestion-discounts} : Create a new systemSuggestionDiscount.
     *
     * @param systemSuggestionDiscount the systemSuggestionDiscount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemSuggestionDiscount, or with status {@code 400 (Bad Request)} if the systemSuggestionDiscount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-suggestion-discounts")
    public ResponseEntity<SystemSuggestionDiscount> createSystemSuggestionDiscount(@RequestBody SystemSuggestionDiscount systemSuggestionDiscount) throws URISyntaxException {
        log.debug("REST request to save SystemSuggestionDiscount : {}", systemSuggestionDiscount);
        if (systemSuggestionDiscount.getId() != null) {
            throw new BadRequestAlertException("A new systemSuggestionDiscount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemSuggestionDiscount result = systemSuggestionDiscountRepository.save(systemSuggestionDiscount);
        return ResponseEntity.created(new URI("/api/system-suggestion-discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-suggestion-discounts} : Updates an existing systemSuggestionDiscount.
     *
     * @param systemSuggestionDiscount the systemSuggestionDiscount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemSuggestionDiscount,
     * or with status {@code 400 (Bad Request)} if the systemSuggestionDiscount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemSuggestionDiscount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-suggestion-discounts")
    public ResponseEntity<SystemSuggestionDiscount> updateSystemSuggestionDiscount(@RequestBody SystemSuggestionDiscount systemSuggestionDiscount) throws URISyntaxException {
        log.debug("REST request to update SystemSuggestionDiscount : {}", systemSuggestionDiscount);
        if (systemSuggestionDiscount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemSuggestionDiscount result = systemSuggestionDiscountRepository.save(systemSuggestionDiscount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemSuggestionDiscount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-suggestion-discounts} : get all the systemSuggestionDiscounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemSuggestionDiscounts in body.
     */
    @GetMapping("/system-suggestion-discounts")
    public List<SystemSuggestionDiscount> getAllSystemSuggestionDiscounts() {
        log.debug("REST request to get all SystemSuggestionDiscounts");
        return systemSuggestionDiscountRepository.findAll();
    }

    /**
     * {@code GET  /system-suggestion-discounts/:id} : get the "id" systemSuggestionDiscount.
     *
     * @param id the id of the systemSuggestionDiscount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemSuggestionDiscount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-suggestion-discounts/{id}")
    public ResponseEntity<SystemSuggestionDiscount> getSystemSuggestionDiscount(@PathVariable Long id) {
        log.debug("REST request to get SystemSuggestionDiscount : {}", id);
        Optional<SystemSuggestionDiscount> systemSuggestionDiscount = systemSuggestionDiscountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemSuggestionDiscount);
    }

    /**
     * {@code DELETE  /system-suggestion-discounts/:id} : delete the "id" systemSuggestionDiscount.
     *
     * @param id the id of the systemSuggestionDiscount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-suggestion-discounts/{id}")
    public ResponseEntity<Void> deleteSystemSuggestionDiscount(@PathVariable Long id) {
        log.debug("REST request to delete SystemSuggestionDiscount : {}", id);
        systemSuggestionDiscountRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
