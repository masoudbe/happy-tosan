package com.tosan.betting.web.rest;

import com.tosan.betting.BettingApp;
import com.tosan.betting.domain.ChatInfo;
import com.tosan.betting.repository.ChatInfoRepository;
import com.tosan.betting.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.tosan.betting.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ChatInfoResource} REST controller.
 */
@SpringBootTest(classes = BettingApp.class)
public class ChatInfoResourceIT {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_ACCEPT_BY_ADMIN = false;
    private static final Boolean UPDATED_ACCEPT_BY_ADMIN = true;

    private static final String DEFAULT_FROM_USER = "AAAAAAAAAA";
    private static final String UPDATED_FROM_USER = "BBBBBBBBBB";

    private static final String DEFAULT_TO_USER = "AAAAAAAAAA";
    private static final String UPDATED_TO_USER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_DELETED = false;
    private static final Boolean UPDATED_IS_DELETED = true;

    @Autowired
    private ChatInfoRepository chatInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restChatInfoMockMvc;

    private ChatInfo chatInfo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatInfoResource chatInfoResource = new ChatInfoResource(chatInfoRepository);
        this.restChatInfoMockMvc = MockMvcBuilders.standaloneSetup(chatInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatInfo createEntity(EntityManager em) {
        ChatInfo chatInfo = new ChatInfo()
            .message(DEFAULT_MESSAGE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .acceptByAdmin(DEFAULT_ACCEPT_BY_ADMIN)
            .fromUser(DEFAULT_FROM_USER)
            .toUser(DEFAULT_TO_USER)
            .sentDate(DEFAULT_SENT_DATE)
            .isDeleted(DEFAULT_IS_DELETED);
        return chatInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatInfo createUpdatedEntity(EntityManager em) {
        ChatInfo chatInfo = new ChatInfo()
            .message(UPDATED_MESSAGE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .acceptByAdmin(UPDATED_ACCEPT_BY_ADMIN)
            .fromUser(UPDATED_FROM_USER)
            .toUser(UPDATED_TO_USER)
            .sentDate(UPDATED_SENT_DATE)
            .isDeleted(UPDATED_IS_DELETED);
        return chatInfo;
    }

    @BeforeEach
    public void initTest() {
        chatInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatInfo() throws Exception {
        int databaseSizeBeforeCreate = chatInfoRepository.findAll().size();

        // Create the ChatInfo
        restChatInfoMockMvc.perform(post("/api/chat-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatInfo)))
            .andExpect(status().isCreated());

        // Validate the ChatInfo in the database
        List<ChatInfo> chatInfoList = chatInfoRepository.findAll();
        assertThat(chatInfoList).hasSize(databaseSizeBeforeCreate + 1);
        ChatInfo testChatInfo = chatInfoList.get(chatInfoList.size() - 1);
        assertThat(testChatInfo.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testChatInfo.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testChatInfo.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testChatInfo.isAcceptByAdmin()).isEqualTo(DEFAULT_ACCEPT_BY_ADMIN);
        assertThat(testChatInfo.getFromUser()).isEqualTo(DEFAULT_FROM_USER);
        assertThat(testChatInfo.getToUser()).isEqualTo(DEFAULT_TO_USER);
        assertThat(testChatInfo.getSentDate()).isEqualTo(DEFAULT_SENT_DATE);
        assertThat(testChatInfo.isIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);
    }

    @Test
    @Transactional
    public void createChatInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatInfoRepository.findAll().size();

        // Create the ChatInfo with an existing ID
        chatInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatInfoMockMvc.perform(post("/api/chat-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ChatInfo in the database
        List<ChatInfo> chatInfoList = chatInfoRepository.findAll();
        assertThat(chatInfoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChatInfos() throws Exception {
        // Initialize the database
        chatInfoRepository.saveAndFlush(chatInfo);

        // Get all the chatInfoList
        restChatInfoMockMvc.perform(get("/api/chat-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].acceptByAdmin").value(hasItem(DEFAULT_ACCEPT_BY_ADMIN.booleanValue())))
            .andExpect(jsonPath("$.[*].fromUser").value(hasItem(DEFAULT_FROM_USER.toString())))
            .andExpect(jsonPath("$.[*].toUser").value(hasItem(DEFAULT_TO_USER.toString())))
            .andExpect(jsonPath("$.[*].sentDate").value(hasItem(DEFAULT_SENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getChatInfo() throws Exception {
        // Initialize the database
        chatInfoRepository.saveAndFlush(chatInfo);

        // Get the chatInfo
        restChatInfoMockMvc.perform(get("/api/chat-infos/{id}", chatInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatInfo.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.acceptByAdmin").value(DEFAULT_ACCEPT_BY_ADMIN.booleanValue()))
            .andExpect(jsonPath("$.fromUser").value(DEFAULT_FROM_USER.toString()))
            .andExpect(jsonPath("$.toUser").value(DEFAULT_TO_USER.toString()))
            .andExpect(jsonPath("$.sentDate").value(DEFAULT_SENT_DATE.toString()))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChatInfo() throws Exception {
        // Get the chatInfo
        restChatInfoMockMvc.perform(get("/api/chat-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatInfo() throws Exception {
        // Initialize the database
        chatInfoRepository.saveAndFlush(chatInfo);

        int databaseSizeBeforeUpdate = chatInfoRepository.findAll().size();

        // Update the chatInfo
        ChatInfo updatedChatInfo = chatInfoRepository.findById(chatInfo.getId()).get();
        // Disconnect from session so that the updates on updatedChatInfo are not directly saved in db
        em.detach(updatedChatInfo);
        updatedChatInfo
            .message(UPDATED_MESSAGE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .acceptByAdmin(UPDATED_ACCEPT_BY_ADMIN)
            .fromUser(UPDATED_FROM_USER)
            .toUser(UPDATED_TO_USER)
            .sentDate(UPDATED_SENT_DATE)
            .isDeleted(UPDATED_IS_DELETED);

        restChatInfoMockMvc.perform(put("/api/chat-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChatInfo)))
            .andExpect(status().isOk());

        // Validate the ChatInfo in the database
        List<ChatInfo> chatInfoList = chatInfoRepository.findAll();
        assertThat(chatInfoList).hasSize(databaseSizeBeforeUpdate);
        ChatInfo testChatInfo = chatInfoList.get(chatInfoList.size() - 1);
        assertThat(testChatInfo.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testChatInfo.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testChatInfo.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testChatInfo.isAcceptByAdmin()).isEqualTo(UPDATED_ACCEPT_BY_ADMIN);
        assertThat(testChatInfo.getFromUser()).isEqualTo(UPDATED_FROM_USER);
        assertThat(testChatInfo.getToUser()).isEqualTo(UPDATED_TO_USER);
        assertThat(testChatInfo.getSentDate()).isEqualTo(UPDATED_SENT_DATE);
        assertThat(testChatInfo.isIsDeleted()).isEqualTo(UPDATED_IS_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingChatInfo() throws Exception {
        int databaseSizeBeforeUpdate = chatInfoRepository.findAll().size();

        // Create the ChatInfo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChatInfoMockMvc.perform(put("/api/chat-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ChatInfo in the database
        List<ChatInfo> chatInfoList = chatInfoRepository.findAll();
        assertThat(chatInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChatInfo() throws Exception {
        // Initialize the database
        chatInfoRepository.saveAndFlush(chatInfo);

        int databaseSizeBeforeDelete = chatInfoRepository.findAll().size();

        // Delete the chatInfo
        restChatInfoMockMvc.perform(delete("/api/chat-infos/{id}", chatInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChatInfo> chatInfoList = chatInfoRepository.findAll();
        assertThat(chatInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatInfo.class);
        ChatInfo chatInfo1 = new ChatInfo();
        chatInfo1.setId(1L);
        ChatInfo chatInfo2 = new ChatInfo();
        chatInfo2.setId(chatInfo1.getId());
        assertThat(chatInfo1).isEqualTo(chatInfo2);
        chatInfo2.setId(2L);
        assertThat(chatInfo1).isNotEqualTo(chatInfo2);
        chatInfo1.setId(null);
        assertThat(chatInfo1).isNotEqualTo(chatInfo2);
    }
}
