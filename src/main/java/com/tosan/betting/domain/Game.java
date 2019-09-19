package com.tosan.betting.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team_1_name")
    private String team1Name;

    @Column(name = "team_2_name")
    private String team2Name;

    @Column(name = "team_1_goal")
    private Integer team1Goal;

    @Column(name = "team_2_goal")
    private Integer team2Goal;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "league_number")
    private Integer leagueNumber;

    @Column(name = "date")
    private LocalDate date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeam1Name() {
        return team1Name;
    }

    public Game team1Name(String team1Name) {
        this.team1Name = team1Name;
        return this;
    }

    public void setTeam1Name(String team1Name) {
        this.team1Name = team1Name;
    }

    public String getTeam2Name() {
        return team2Name;
    }

    public Game team2Name(String team2Name) {
        this.team2Name = team2Name;
        return this;
    }

    public void setTeam2Name(String team2Name) {
        this.team2Name = team2Name;
    }

    public Integer getTeam1Goal() {
        return team1Goal;
    }

    public Game team1Goal(Integer team1Goal) {
        this.team1Goal = team1Goal;
        return this;
    }

    public void setTeam1Goal(Integer team1Goal) {
        this.team1Goal = team1Goal;
    }

    public Integer getTeam2Goal() {
        return team2Goal;
    }

    public Game team2Goal(Integer team2Goal) {
        this.team2Goal = team2Goal;
        return this;
    }

    public void setTeam2Goal(Integer team2Goal) {
        this.team2Goal = team2Goal;
    }

    public String getGroupName() {
        return groupName;
    }

    public Game groupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Integer getLeagueNumber() {
        return leagueNumber;
    }

    public Game leagueNumber(Integer leagueNumber) {
        this.leagueNumber = leagueNumber;
        return this;
    }

    public void setLeagueNumber(Integer leagueNumber) {
        this.leagueNumber = leagueNumber;
    }

    public LocalDate getDate() {
        return date;
    }

    public Game date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Game)) {
            return false;
        }
        return id != null && id.equals(((Game) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", team1Name='" + getTeam1Name() + "'" +
            ", team2Name='" + getTeam2Name() + "'" +
            ", team1Goal=" + getTeam1Goal() +
            ", team2Goal=" + getTeam2Goal() +
            ", groupName='" + getGroupName() + "'" +
            ", leagueNumber=" + getLeagueNumber() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
