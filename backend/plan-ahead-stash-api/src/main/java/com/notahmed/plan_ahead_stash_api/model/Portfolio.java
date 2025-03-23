package com.notahmed.plan_ahead_stash_api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.Objects;

// A user can have many portfolios
// Portfolio can only be to one user
// Portfolio consists of many assets
// Asset can be to many Portfolios
@Entity
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_date", nullable = false, updatable=false)
    @CreationTimestamp
    private Date createdDate;

    // TODO: Will be done from service temporarily
    @Column(name = "modified_date")
    @UpdateTimestamp
    private Date modifiedDate;

    public Portfolio() {
    }

    public Portfolio(Long id, String name, User user, Date createdDate, Date modifiedDate) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Portfolio portfolio = (Portfolio) o;
        return Objects.equals(id, portfolio.id) && Objects.equals(name, portfolio.name) && Objects.equals(user, portfolio.user) && Objects.equals(createdDate, portfolio.createdDate) && Objects.equals(modifiedDate, portfolio.modifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, user, createdDate, modifiedDate);
    }

    @Override
    public String toString() {
        return "Portfolio{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                ", createdDate=" + createdDate +
                ", modifiedDate=" + modifiedDate +
                '}';
    }
}
