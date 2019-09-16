package com.tosan.betting.web.rest;

import com.tosan.betting.domain.ChatInfo;
import com.tosan.betting.repository.ChatInfoRepository;
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
 * REST controller for managing {@link com.tosan.betting.domain.ChatInfo}.
 */
@RestController
@RequestMapping("/api")
public class ChatInfoResource {

    private final Logger log = LoggerFactory.getLogger(ChatInfoResource.class);

    private static final String ENTITY_NAME = "chatInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChatInfoRepository chatInfoRepository;

    public ChatInfoResource(ChatInfoRepository chatInfoRepository) {
        this.chatInfoRepository = chatInfoRepository;
    }

    /**
     * {@code POST  /chat-infos} : Create a new chatInfo.
     *
     * @param chatInfo the chatInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chatInfo, or with status {@code 400 (Bad Request)} if the chatInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chat-infos")
    public ResponseEntity<ChatInfo> createChatInfo(@RequestBody ChatInfo chatInfo) throws URISyntaxException {
        log.debug("REST request to save ChatInfo : {}", chatInfo);
        if (chatInfo.getId() != null) {
            throw new BadRequestAlertException("A new chatInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatInfo result = chatInfoRepository.save(chatInfo);
        return ResponseEntity.created(new URI("/api/chat-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chat-infos} : Updates an existing chatInfo.
     *
     * @param chatInfo the chatInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chatInfo,
     * or with status {@code 400 (Bad Request)} if the chatInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chatInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chat-infos")
    public ResponseEntity<ChatInfo> updateChatInfo(@RequestBody ChatInfo chatInfo) throws URISyntaxException {
        log.debug("REST request to update ChatInfo : {}", chatInfo);
        if (chatInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChatInfo result = chatInfoRepository.save(chatInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chatInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chat-infos} : get all the chatInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chatInfos in body.
     */
    @GetMapping("/chat-infos")
    public List<ChatInfo> getAllChatInfos() {
        log.debug("REST request to get all ChatInfos");
        return chatInfoRepository.findAll();
    }

    /**
     * {@code GET  /chat-infos/:id} : get the "id" chatInfo.
     *
     * @param id the id of the chatInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chatInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chat-infos/{id}")
    public ResponseEntity<ChatInfo> getChatInfo(@PathVariable Long id) {
        log.debug("REST request to get ChatInfo : {}", id);
        Optional<ChatInfo> chatInfo = chatInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chatInfo);
    }

    /**
     * {@code DELETE  /chat-infos/:id} : delete the "id" chatInfo.
     *
     * @param id the id of the chatInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chat-infos/{id}")
    public ResponseEntity<Void> deleteChatInfo(@PathVariable Long id) {
        log.debug("REST request to delete ChatInfo : {}", id);
        chatInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
