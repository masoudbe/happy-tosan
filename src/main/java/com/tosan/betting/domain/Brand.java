package com.tosan.betting.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Brand.
 */
@Entity
@Table(name = "brand")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Brand implements Serializable {

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

    public Brand code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEnName() {
        return enName;
    }

    public Brand enName(String enName) {
        this.enName = enName;
        return this;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getFaName() {
        return faName;
    }

    public Brand faName(String faName) {
        this.faName = faName;
        return this;
    }

    public void setFaName(String faName) {
        this.faName = faName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Brand)) {
            return false;
        }
        return id != null && id.equals(((Brand) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Brand{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", enName='" + getEnName() + "'" +
            ", faName='" + getFaName() + "'" +
            "}";
    }
}
