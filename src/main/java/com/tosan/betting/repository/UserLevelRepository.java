package com.tosan.betting.repository;

import com.tosan.betting.domain.UserLevel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {

    @Query("select userLevel from UserLevel userLevel where userLevel.mainUser.login = ?#{principal.username}")
    List<UserLevel> findByMainUserIsCurrentUser();

    @Query("select userLevel from UserLevel userLevel where userLevel.user.login = ?#{principal.username}")
    List<UserLevel> findByUserIsCurrentUser();

}
