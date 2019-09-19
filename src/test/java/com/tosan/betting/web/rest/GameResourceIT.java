package com.tosan.betting.web.rest;

import com.tosan.betting.BettingApp;
import com.tosan.betting.domain.Game;
import com.tosan.betting.repository.GameRepository;
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
 * Integration tests for the {@Link GameResource} REST controller.
 */
@SpringBootTest(classes = BettingApp.class)
public class GameResourceIT {

    private static final String DEFAULT_TEAM_1_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEAM_1_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TEAM_2_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEAM_2_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEAM_1_GOAL = 1;
    private static final Integer UPDATED_TEAM_1_GOAL = 2;

    private static final Integer DEFAULT_TEAM_2_GOAL = 1;
    private static final Integer UPDATED_TEAM_2_GOAL = 2;

    private static final String DEFAULT_GROUP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GROUP_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEAGUE_NUMBER = 1;
    private static final Integer UPDATED_LEAGUE_NUMBER = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GameRepository gameRepository;

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

    private MockMvc restGameMockMvc;

    private Game game;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameResource gameResource = new GameResource(gameRepository);
        this.restGameMockMvc = MockMvcBuilders.standaloneSetup(gameResource)
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
    public static Game createEntity(EntityManager em) {
        Game game = new Game()
            .team1Name(DEFAULT_TEAM_1_NAME)
            .team2Name(DEFAULT_TEAM_2_NAME)
            .team1Goal(DEFAULT_TEAM_1_GOAL)
            .team2Goal(DEFAULT_TEAM_2_GOAL)
            .groupName(DEFAULT_GROUP_NAME)
            .leagueNumber(DEFAULT_LEAGUE_NUMBER)
            .date(DEFAULT_DATE);
        return game;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Game createUpdatedEntity(EntityManager em) {
        Game game = new Game()
            .team1Name(UPDATED_TEAM_1_NAME)
            .team2Name(UPDATED_TEAM_2_NAME)
            .team1Goal(UPDATED_TEAM_1_GOAL)
            .team2Goal(UPDATED_TEAM_2_GOAL)
            .groupName(UPDATED_GROUP_NAME)
            .leagueNumber(UPDATED_LEAGUE_NUMBER)
            .date(UPDATED_DATE);
        return game;
    }

    @BeforeEach
    public void initTest() {
        game = createEntity(em);
    }

    @Test
    @Transactional
    public void createGame() throws Exception {
        int databaseSizeBeforeCreate = gameRepository.findAll().size();

        // Create the Game
        restGameMockMvc.perform(post("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(game)))
            .andExpect(status().isCreated());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeCreate + 1);
        Game testGame = gameList.get(gameList.size() - 1);
        assertThat(testGame.getTeam1Name()).isEqualTo(DEFAULT_TEAM_1_NAME);
        assertThat(testGame.getTeam2Name()).isEqualTo(DEFAULT_TEAM_2_NAME);
        assertThat(testGame.getTeam1Goal()).isEqualTo(DEFAULT_TEAM_1_GOAL);
        assertThat(testGame.getTeam2Goal()).isEqualTo(DEFAULT_TEAM_2_GOAL);
        assertThat(testGame.getGroupName()).isEqualTo(DEFAULT_GROUP_NAME);
        assertThat(testGame.getLeagueNumber()).isEqualTo(DEFAULT_LEAGUE_NUMBER);
        assertThat(testGame.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createGameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameRepository.findAll().size();

        // Create the Game with an existing ID
        game.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameMockMvc.perform(post("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(game)))
            .andExpect(status().isBadRequest());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGames() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        // Get all the gameList
        restGameMockMvc.perform(get("/api/games?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(game.getId().intValue())))
            .andExpect(jsonPath("$.[*].team1Name").value(hasItem(DEFAULT_TEAM_1_NAME.toString())))
            .andExpect(jsonPath("$.[*].team2Name").value(hasItem(DEFAULT_TEAM_2_NAME.toString())))
            .andExpect(jsonPath("$.[*].team1Goal").value(hasItem(DEFAULT_TEAM_1_GOAL)))
            .andExpect(jsonPath("$.[*].team2Goal").value(hasItem(DEFAULT_TEAM_2_GOAL)))
            .andExpect(jsonPath("$.[*].groupName").value(hasItem(DEFAULT_GROUP_NAME.toString())))
            .andExpect(jsonPath("$.[*].leagueNumber").value(hasItem(DEFAULT_LEAGUE_NUMBER)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        // Get the game
        restGameMockMvc.perform(get("/api/games/{id}", game.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(game.getId().intValue()))
            .andExpect(jsonPath("$.team1Name").value(DEFAULT_TEAM_1_NAME.toString()))
            .andExpect(jsonPath("$.team2Name").value(DEFAULT_TEAM_2_NAME.toString()))
            .andExpect(jsonPath("$.team1Goal").value(DEFAULT_TEAM_1_GOAL))
            .andExpect(jsonPath("$.team2Goal").value(DEFAULT_TEAM_2_GOAL))
            .andExpect(jsonPath("$.groupName").value(DEFAULT_GROUP_NAME.toString()))
            .andExpect(jsonPath("$.leagueNumber").value(DEFAULT_LEAGUE_NUMBER))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGame() throws Exception {
        // Get the game
        restGameMockMvc.perform(get("/api/games/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        int databaseSizeBeforeUpdate = gameRepository.findAll().size();

        // Update the game
        Game updatedGame = gameRepository.findById(game.getId()).get();
        // Disconnect from session so that the updates on updatedGame are not directly saved in db
        em.detach(updatedGame);
        updatedGame
            .team1Name(UPDATED_TEAM_1_NAME)
            .team2Name(UPDATED_TEAM_2_NAME)
            .team1Goal(UPDATED_TEAM_1_GOAL)
            .team2Goal(UPDATED_TEAM_2_GOAL)
            .groupName(UPDATED_GROUP_NAME)
            .leagueNumber(UPDATED_LEAGUE_NUMBER)
            .date(UPDATED_DATE);

        restGameMockMvc.perform(put("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGame)))
            .andExpect(status().isOk());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeUpdate);
        Game testGame = gameList.get(gameList.size() - 1);
        assertThat(testGame.getTeam1Name()).isEqualTo(UPDATED_TEAM_1_NAME);
        assertThat(testGame.getTeam2Name()).isEqualTo(UPDATED_TEAM_2_NAME);
        assertThat(testGame.getTeam1Goal()).isEqualTo(UPDATED_TEAM_1_GOAL);
        assertThat(testGame.getTeam2Goal()).isEqualTo(UPDATED_TEAM_2_GOAL);
        assertThat(testGame.getGroupName()).isEqualTo(UPDATED_GROUP_NAME);
        assertThat(testGame.getLeagueNumber()).isEqualTo(UPDATED_LEAGUE_NUMBER);
        assertThat(testGame.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGame() throws Exception {
        int databaseSizeBeforeUpdate = gameRepository.findAll().size();

        // Create the Game

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameMockMvc.perform(put("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(game)))
            .andExpect(status().isBadRequest());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        int databaseSizeBeforeDelete = gameRepository.findAll().size();

        // Delete the game
        restGameMockMvc.perform(delete("/api/games/{id}", game.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Game.class);
        Game game1 = new Game();
        game1.setId(1L);
        Game game2 = new Game();
        game2.setId(game1.getId());
        assertThat(game1).isEqualTo(game2);
        game2.setId(2L);
        assertThat(game1).isNotEqualTo(game2);
        game1.setId(null);
        assertThat(game1).isNotEqualTo(game2);
    }
}
