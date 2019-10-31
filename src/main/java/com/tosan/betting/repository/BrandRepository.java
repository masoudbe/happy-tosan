package com.tosan.betting.repository;

import com.tosan.betting.domain.Brand;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Brand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}
