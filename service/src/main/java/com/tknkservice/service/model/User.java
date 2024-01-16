package com.tknkservice.service.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user", schema = "public")
@JsonIgnoreProperties("hibernateLazyInitializer")


public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    //otomatik id yi generate etmeye yarar AUTO da olur
    //@Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "adi")
    private String adi;
    @Column(name = "soyadi")
    private String soyadi;
    @Column(name = "dogum_tarihi")
    private Date dogumTarihi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAdi() {
        return adi;
    }

    public void setAdi(String adi) {
        this.adi = adi;
    }

    public String getSoyadi() {
        return soyadi;
    }

    public void setSoyadi(String soyadi) {
        this.soyadi = soyadi;
    }

    public Date getDogumTarihi() {
        return dogumTarihi;
    }

    public void setDogumTarihi(Date dogumTarihi) {
        this.dogumTarihi = dogumTarihi;
    }

    @Column(name = "app_role_id")
    private Integer appRoleId;

    public Integer getAppRoleId() {
        return appRoleId;
    }

    public void setAppRoleId(Integer appRoleId) {
        this.appRoleId = appRoleId;
    }

    @Override
    public String toString() {
        return "{" +
                " \"username\":\"" + username + "\"," +
                " \"adi\":\"" + adi + "\"," +
                " \"soyadi\":\"" + soyadi + "\"" +
                '}';
    }
}
