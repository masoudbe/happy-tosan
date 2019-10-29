package com.tosan.betting.web.rest;

import com.tosan.betting.domain.UserLevel;
import com.tosan.betting.repository.UserLevelRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.UserLevel}.
 */
@RestController
@RequestMapping("/api")
public class UserLevelResource {

    private final Logger log = LoggerFactory.getLogger(UserLevelResource.class);

    private static final String ENTITY_NAME = "userLevel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserLevelRepository userLevelRepository;

    public UserLevelResource(UserLevelRepository userLevelRepository) {
        this.userLevelRepository = userLevelRepository;
    }

    /**
     * {@code POST  /user-levels} : Create a new userLevel.
     *
     * @param userLevel the userLevel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userLevel, or with status {@code 400 (Bad Request)} if the userLevel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-levels")
    public ResponseEntity<UserLevel> createUserLevel(@RequestBody UserLevel userLevel) throws URISyntaxException {
        log.debug("REST request to save UserLevel : {}", userLevel);
        if (userLevel.getId() != null) {
            throw new BadRequestAlertException("A new userLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserLevel result = userLevelRepository.save(userLevel);
        return ResponseEntity.created(new URI("/api/user-levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-levels} : Updates an existing userLevel.
     *
     * @param userLevel the userLevel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userLevel,
     * or with status {@code 400 (Bad Request)} if the userLevel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userLevel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-levels")
    public ResponseEntity<UserLevel> updateUserLevel(@RequestBody UserLevel userLevel) throws URISyntaxException {
        log.debug("REST request to update UserLevel : {}", userLevel);
        if (userLevel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserLevel result = userLevelRepository.save(userLevel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userLevel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-levels} : get all the userLevels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userLevels in body.
     */
    @GetMapping("/user-levels")
    public List<UserLevel> getAllUserLevels() {
        log.debug("REST request to get all UserLevels");
        return userLevelRepository.findAll();
    }

    /**
     * {@code GET  /user-levels/:id} : get the "id" userLevel.
     *
     * @param id the id of the userLevel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userLevel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-levels/{id}")
    public ResponseEntity<UserLevel> getUserLevel(@PathVariable Long id) {
        log.debug("REST request to get UserLevel : {}", id);
        Optional<UserLevel> userLevel = userLevelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userLevel);
    }

    /**
     * {@code DELETE  /user-levels/:id} : delete the "id" userLevel.
     *
     * @param id the id of the userLevel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-levels/{id}")
    public ResponseEntity<Void> deleteUserLevel(@PathVariable Long id) {
        log.debug("REST request to delete UserLevel : {}", id);
        userLevelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
