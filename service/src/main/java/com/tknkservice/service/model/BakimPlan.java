package com.tknkservice.service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bakim_plan", schema = "public")
@JsonIgnoreProperties("hibernateLazyInitializer")


public class BakimPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bakim_plan_seq")
    @SequenceGenerator(name = "bakim_plan_seq", sequenceName = "bakim_plan_seq", allocationSize = 1)
    //otomatik id yi generate etmeye yarar AUTO da olur
    //@Column(name = "id")
    private Long id;

    @Column(name = "bakim_turu")
    private String bakimTuru;
    @Column(name = "bakim_tarihi")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date bakimTarihi;

    @Column(name = "bakim_maliyet")
    private int bakimMaliyet;
    @Column(name = "bakim_durumu")
    private String bakimDurumu;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBakimTuru() {
        return bakimTuru;
    }

    public void setBakimTuru(String bakimTuru) {
        this.bakimTuru = bakimTuru;
    }

    public Date getBakimTarihi() {
        return bakimTarihi;
    }

    public void setBakimTarihi(Date bakimTarihi) {
        this.bakimTarihi = bakimTarihi;
    }

    public int getBakimMaliyet() {
        return bakimMaliyet;
    }

    public void setBakimMaliyet(int bakimMaliyet) {
        this.bakimMaliyet = bakimMaliyet;
    }

    public String getBakimDurumu() {
        return bakimDurumu;
    }

    public void setBakimDurumu(String bakimDurumu) {
        this.bakimDurumu = bakimDurumu;
    }
}
