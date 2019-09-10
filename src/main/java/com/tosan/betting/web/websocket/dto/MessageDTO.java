package com.tosan.betting.web.websocket.dto;

import java.time.Instant;

/**
 * DTO for storing a user's activity.
 */
public class MessageDTO {

    private String sessionId;

    private String userLogin;

    private String ipAddress;

    private String message;

    private Instant time;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String page) {
        this.message = page;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ActivityDTO{" +
            "sessionId='" + sessionId + '\'' +
            ", userLogin='" + userLogin + '\'' +
            ", ipAddress='" + ipAddress + '\'' +
            ", page='" + message + '\'' +
            ", time='" + time + '\'' +
            '}';
    }
}
