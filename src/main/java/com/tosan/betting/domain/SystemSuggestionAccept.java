package com.tosan.betting.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A SystemSuggestionAccept.
 */
@Entity
@Table(name = "system_suggestion_accept")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SystemSuggestionAccept implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("systemSuggestionAccepts")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("systemSuggestionAccepts")
    private SystemSuggestion suggestion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public SystemSuggestionAccept comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getDate() {
        return date;
    }

    public SystemSuggestionAccept date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public SystemSuggestionAccept user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SystemSuggestion getSuggestion() {
        return suggestion;
    }

    public SystemSuggestionAccept suggestion(SystemSuggestion systemSuggestion) {
        this.suggestion = systemSuggestion;
        return this;
    }

    public void setSuggestion(SystemSuggestion systemSuggestion) {
        this.suggestion = systemSuggestion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SystemSuggestionAccept)) {
            return false;
        }
        return id != null && id.equals(((SystemSuggestionAccept) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SystemSuggestionAccept{" +
            "id=" + getId() +
            ", comment='" + getComment() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
