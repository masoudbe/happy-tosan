package com.tosan.betting.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProductType.
 */
@Entity
@Table(name = "product_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "en_name")
    private String enName;

    @Column(name = "fa_name")
    private String faName;

    @ManyToOne
    @JsonIgnoreProperties("productTypes")
    private ProductType parentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public ProductType code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEnName() {
        return enName;
    }

    public ProductType enName(String enName) {
        this.enName = enName;
        return this;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getFaName() {
        return faName;
    }

    public ProductType faName(String faName) {
        this.faName = faName;
        return this;
    }

    public void setFaName(String faName) {
        this.faName = faName;
    }

    public ProductType getParentType() {
        return parentType;
    }

    public ProductType parentType(ProductType productType) {
        this.parentType = productType;
        return this;
    }

    public void setParentType(ProductType productType) {
        this.parentType = productType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductType)) {
            return false;
        }
        return id != null && id.equals(((ProductType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductType{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", enName='" + getEnName() + "'" +
            ", faName='" + getFaName() + "'" +
            "}";
    }
}
