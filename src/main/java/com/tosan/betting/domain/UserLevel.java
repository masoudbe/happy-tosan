package com.tosan.betting.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserLevel.
 */
@Entity
@Table(name = "user_level")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private Integer level;

    @ManyToOne
    @JsonIgnoreProperties("userLevels")
    private User mainUser;

    @ManyToOne
    @JsonIgnoreProperties("userLevels")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLevel() {
        return level;
    }

    public UserLevel level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public User getMainUser() {
        return mainUser;
    }

    public UserLevel mainUser(User user) {
        this.mainUser = user;
        return this;
    }

    public void setMainUser(User user) {
        this.mainUser = user;
    }

    public User getUser() {
        return user;
    }

    public UserLevel user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserLevel)) {
            return false;
        }
        return id != null && id.equals(((UserLevel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserLevel{" +
            "id=" + getId() +
            ", level=" + getLevel() +
            "}";
    }
}
