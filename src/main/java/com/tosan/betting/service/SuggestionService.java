package com.tosan.betting.service;

import com.tosan.betting.domain.Suggestion;
import com.tosan.betting.domain.UserLevel;
import com.tosan.betting.repository.SuggestionRepository;
import com.tosan.betting.repository.UserLevelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SuggestionService {
    private final Logger log = LoggerFactory.getLogger(SuggestionService.class);
    private final SuggestionRepository suggestionRepository;

    public SuggestionService(SuggestionRepository suggLevelRepository) {
        this.suggestionRepository = suggLevelRepository;
    }

    @Transactional(readOnly = true)
    public List<Suggestion> getAllSuggestionsHasProducedByCurrentUser() {
        return suggestionRepository.findByUserIsCurrentUser();
    }

    @Transactional(readOnly = true)
    public List<Suggestion> getAllSuggestionsHasAccess(Long userId) {
        return suggestionRepository.findSuggestionsHasAccess(userId);
    }

}
