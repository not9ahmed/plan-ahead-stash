package com.notahmed.plan_ahead_stash_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

import java.util.Date;


// Might delete this entity
@Entity
@Table(name = "investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Name cannot be null")
    private String name;

    // 3 Characters
    @Length(max = 3, message = "Currency can only be 3 characters")
    private String currency;

    private Date startDate;

    private Date endDate;

    @NotNull(message = "Days cannot be empty")
    private Integer days;


    public Investment() {
    }

    public Investment(Long id, String name, String currency, Date startDate, Date endDate, Integer days) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.days = days;
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

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    @Override
    public String toString() {
        return "Investment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", currency='" + currency + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", days=" + days +
                '}';
    }
}
