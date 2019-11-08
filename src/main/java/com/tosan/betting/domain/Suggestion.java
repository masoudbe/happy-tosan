package com.tosan.betting.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Suggestion.
 */
@Entity
@Table(name = "suggestion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Suggestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fa_name")
    private String faName;

    @Column(name = "en_name")
    private String enName;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Lob
    @Column(name = "img_1")
    private byte[] img1;

    @Column(name = "img_1_content_type")
    private String img1ContentType;

    @Lob
    @Column(name = "img_2")
    private byte[] img2;

    @Column(name = "img_2_content_type")
    private String img2ContentType;

    @Lob
    @Column(name = "img_3")
    private byte[] img3;

    @Column(name = "img_3_content_type")
    private String img3ContentType;

    @Lob
    @Column(name = "img_4")
    private byte[] img4;

    @Column(name = "img_4_content_type")
    private String img4ContentType;

    @Column(name = "price")
    private Double price;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "score")
    private Integer score;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JsonIgnoreProperties("suggestions")
    private ProductType type;

    @ManyToOne
    @JsonIgnoreProperties("suggestions")
    private Brand brand;

    @ManyToOne
    @JsonIgnoreProperties("suggestions")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaName() {
        return faName;
    }

    public Suggestion faName(String faName) {
        this.faName = faName;
        return this;
    }

    public void setFaName(String faName) {
        this.faName = faName;
    }

    public String getEnName() {
        return enName;
    }

    public Suggestion enName(String enName) {
        this.enName = enName;
        return this;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Suggestion startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Suggestion endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public byte[] getImg1() {
        return img1;
    }

    public Suggestion img1(byte[] img1) {
        this.img1 = img1;
        return this;
    }

    public void setImg1(byte[] img1) {
        this.img1 = img1;
    }

    public String getImg1ContentType() {
        return img1ContentType;
    }

    public Suggestion img1ContentType(String img1ContentType) {
        this.img1ContentType = img1ContentType;
        return this;
    }

    public void setImg1ContentType(String img1ContentType) {
        this.img1ContentType = img1ContentType;
    }

    public byte[] getImg2() {
        return img2;
    }

    public Suggestion img2(byte[] img2) {
        this.img2 = img2;
        return this;
    }

    public void setImg2(byte[] img2) {
        this.img2 = img2;
    }

    public String getImg2ContentType() {
        return img2ContentType;
    }

    public Suggestion img2ContentType(String img2ContentType) {
        this.img2ContentType = img2ContentType;
        return this;
    }

    public void setImg2ContentType(String img2ContentType) {
        this.img2ContentType = img2ContentType;
    }

    public byte[] getImg3() {
        return img3;
    }

    public Suggestion img3(byte[] img3) {
        this.img3 = img3;
        return this;
    }

    public void setImg3(byte[] img3) {
        this.img3 = img3;
    }

    public String getImg3ContentType() {
        return img3ContentType;
    }

    public Suggestion img3ContentType(String img3ContentType) {
        this.img3ContentType = img3ContentType;
        return this;
    }

    public void setImg3ContentType(String img3ContentType) {
        this.img3ContentType = img3ContentType;
    }

    public byte[] getImg4() {
        return img4;
    }

    public Suggestion img4(byte[] img4) {
        this.img4 = img4;
        return this;
    }

    public void setImg4(byte[] img4) {
        this.img4 = img4;
    }

    public String getImg4ContentType() {
        return img4ContentType;
    }

    public Suggestion img4ContentType(String img4ContentType) {
        this.img4ContentType = img4ContentType;
        return this;
    }

    public void setImg4ContentType(String img4ContentType) {
        this.img4ContentType = img4ContentType;
    }

    public Double getPrice() {
        return price;
    }

    public Suggestion price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean isActive() {
        return active;
    }

    public Suggestion active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getScore() {
        return score;
    }

    public Suggestion score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public Suggestion comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ProductType getType() {
        return type;
    }

    public Suggestion type(ProductType productType) {
        this.type = productType;
        return this;
    }

    public void setType(ProductType productType) {
        this.type = productType;
    }

    public Brand getBrand() {
        return brand;
    }

    public Suggestion brand(Brand brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public User getUser() {
        return user;
    }

    public Suggestion user(User user) {
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
        if (!(o instanceof Suggestion)) {
            return false;
        }
        return id != null && id.equals(((Suggestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Suggestion{" +
            "id=" + getId() +
            ", faName='" + getFaName() + "'" +
            ", enName='" + getEnName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", img1='" + getImg1() + "'" +
            ", img1ContentType='" + getImg1ContentType() + "'" +
            ", img2='" + getImg2() + "'" +
            ", img2ContentType='" + getImg2ContentType() + "'" +
            ", img3='" + getImg3() + "'" +
            ", img3ContentType='" + getImg3ContentType() + "'" +
            ", img4='" + getImg4() + "'" +
            ", img4ContentType='" + getImg4ContentType() + "'" +
            ", price=" + getPrice() +
            ", active='" + isActive() + "'" +
            ", score=" + getScore() +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
