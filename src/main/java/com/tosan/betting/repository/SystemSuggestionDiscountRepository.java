package com.tosan.betting.repository;

import com.tosan.betting.domain.SystemSuggestionDiscount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SystemSuggestionDiscount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemSuggestionDiscountRepository extends JpaRepository<SystemSuggestionDiscount, Long> {

}
