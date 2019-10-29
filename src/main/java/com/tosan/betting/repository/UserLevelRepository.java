package com.tosan.betting.repository;

import com.tosan.betting.domain.UserLevel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {

}
