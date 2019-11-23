package com.tosan.betting.web.rest;

import com.tosan.betting.domain.Suggestion;
import com.tosan.betting.domain.User;
import com.tosan.betting.repository.SuggestionRepository;
import com.tosan.betting.service.UserService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tosan.betting.domain.Suggestion}.
 */
@RestController
@RequestMapping("/api")
public class SuggestionResource {

    private final Logger log = LoggerFactory.getLogger(SuggestionResource.class);

    private static final String ENTITY_NAME = "suggestion";
    private final UserService userService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuggestionRepository suggestionRepository;

    public SuggestionResource(SuggestionRepository suggestionRepository, UserService userService) {
        this.suggestionRepository = suggestionRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /suggestions} : Create a new suggestion.
     *
     * @param suggestion the suggestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suggestion, or with status {@code 400 (Bad Request)} if the suggestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suggestions")
    public ResponseEntity<Suggestion> createSuggestion(@RequestBody Suggestion suggestion) throws URISyntaxException {
        log.debug("REST request to save Suggestion : {}", suggestion);
        if (suggestion.getId() != null) {
            throw new BadRequestAlertException("A new suggestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        suggestion.setUser(userService.getUserWithAuthorities().get());
        Suggestion result = suggestionRepository.save(suggestion);
        return ResponseEntity.created(new URI("/api/suggestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suggestions} : Updates an existing suggestion.
     *
     * @param suggestion the suggestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suggestion,
     * or with status {@code 400 (Bad Request)} if the suggestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suggestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suggestions")
    public ResponseEntity<Suggestion> updateSuggestion(@RequestBody Suggestion suggestion) throws URISyntaxException {
        log.debug("REST request to update Suggestion : {}", suggestion);
        if (suggestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Suggestion result = suggestionRepository.save(suggestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suggestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /suggestions} : get all the suggestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suggestions in body.
     */
    @GetMapping("/suggestions")
    public List<Suggestion> getAllSuggestions() {
        log.debug("REST request to get all Suggestions");
        User user = userService.getUserWithAuthorities().get();
        List<Suggestion> result = new ArrayList<>();
        result.addAll(suggestionRepository.findByUserIsCurrentUser());
        result.addAll(suggestionRepository.findSuggestionsHasAccess(user.getId()));
        return result;
    }

    /**
     * {@code GET  /suggestions/:id} : get the "id" suggestion.
     *
     * @param id the id of the suggestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suggestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suggestions/{id}")
    public ResponseEntity<Suggestion> getSuggestion(@PathVariable Long id) {
        log.debug("REST request to get Suggestion : {}", id);
        Optional<Suggestion> suggestion = suggestionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suggestion);
    }

    /**
     * {@code DELETE  /suggestions/:id} : delete the "id" suggestion.
     *
     * @param id the id of the suggestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suggestions/{id}")
    public ResponseEntity<Void> deleteSuggestion(@PathVariable Long id) {
        log.debug("REST request to delete Suggestion : {}", id);
        suggestionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
