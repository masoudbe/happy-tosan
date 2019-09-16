package com.tosan.betting.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A ChatInfo.
 */
@Entity
@Table(name = "chat_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ChatInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "accept_by_admin")
    private Boolean acceptByAdmin;

    @Column(name = "from_user")
    private String fromUser;

    @Column(name = "to_user")
    private String toUser;

    @Column(name = "sent_date")
    private LocalDate sentDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public ChatInfo message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public ChatInfo photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public ChatInfo photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Boolean isAcceptByAdmin() {
        return acceptByAdmin;
    }

    public ChatInfo acceptByAdmin(Boolean acceptByAdmin) {
        this.acceptByAdmin = acceptByAdmin;
        return this;
    }

    public void setAcceptByAdmin(Boolean acceptByAdmin) {
        this.acceptByAdmin = acceptByAdmin;
    }

    public String getFromUser() {
        return fromUser;
    }

    public ChatInfo fromUser(String fromUser) {
        this.fromUser = fromUser;
        return this;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public String getToUser() {
        return toUser;
    }

    public ChatInfo toUser(String toUser) {
        this.toUser = toUser;
        return this;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public LocalDate getSentDate() {
        return sentDate;
    }

    public ChatInfo sentDate(LocalDate sentDate) {
        this.sentDate = sentDate;
        return this;
    }

    public void setSentDate(LocalDate sentDate) {
        this.sentDate = sentDate;
    }

    public Boolean isIsDeleted() {
        return isDeleted;
    }

    public ChatInfo isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChatInfo)) {
            return false;
        }
        return id != null && id.equals(((ChatInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ChatInfo{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", acceptByAdmin='" + isAcceptByAdmin() + "'" +
            ", fromUser='" + getFromUser() + "'" +
            ", toUser='" + getToUser() + "'" +
            ", sentDate='" + getSentDate() + "'" +
            ", isDeleted='" + isIsDeleted() + "'" +
            "}";
    }
}
