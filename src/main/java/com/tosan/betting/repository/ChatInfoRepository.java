package com.tosan.betting.repository;

import com.tosan.betting.domain.ChatInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ChatInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatInfoRepository extends JpaRepository<ChatInfo, Long> {

}
