package com.tosan.betting.service;

import com.tosan.betting.config.Constants;
import com.tosan.betting.domain.UserLevel;
import com.tosan.betting.repository.AuthorityRepository;
import com.tosan.betting.repository.UserLevelRepository;
import com.tosan.betting.repository.UserRepository;
import com.tosan.betting.service.dto.UserDTO;
import com.tosan.betting.web.rest.UserLevelResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserLevelService {
    private final Logger log = LoggerFactory.getLogger(UserLevelService.class);
    private final UserLevelRepository userLevelRepository;

    public UserLevelService(UserLevelRepository userLevelRepository) {
        this.userLevelRepository = userLevelRepository;
    }

    @Transactional(readOnly = true)
    public List<UserLevel> getAllUserLevelsByUserId(Long userId) {
        return userLevelRepository.findByUser(userId);
    }

}
