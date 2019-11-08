package com.tosan.betting.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A SystemSuggestionDiscount.
 */
@Entity
@Table(name = "system_suggestion_discount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SystemSuggestionDiscount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "accept_count")
    private Integer acceptCount;

    @ManyToOne
    @JsonIgnoreProperties("systemSuggestionDiscounts")
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

    public SystemSuggestionDiscount comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public SystemSuggestionDiscount startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public SystemSuggestionDiscount endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getDiscountPercent() {
        return discountPercent;
    }

    public SystemSuggestionDiscount discountPercent(Integer discountPercent) {
        this.discountPercent = discountPercent;
        return this;
    }

    public void setDiscountPercent(Integer discountPercent) {
        this.discountPercent = discountPercent;
    }

    public Integer getAcceptCount() {
        return acceptCount;
    }

    public SystemSuggestionDiscount acceptCount(Integer acceptCount) {
        this.acceptCount = acceptCount;
        return this;
    }

    public void setAcceptCount(Integer acceptCount) {
        this.acceptCount = acceptCount;
    }

    public SystemSuggestion getSuggestion() {
        return suggestion;
    }

    public SystemSuggestionDiscount suggestion(SystemSuggestion systemSuggestion) {
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
        if (!(o instanceof SystemSuggestionDiscount)) {
            return false;
        }
        return id != null && id.equals(((SystemSuggestionDiscount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SystemSuggestionDiscount{" +
            "id=" + getId() +
            ", comment='" + getComment() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", discountPercent=" + getDiscountPercent() +
            ", acceptCount=" + getAcceptCount() +
            "}";
    }
}
