package com.tknkservice.service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "makina", schema = "public")
@JsonIgnoreProperties("hibernateLazyInitializer")


public class Makina {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "makina_seq")
    @SequenceGenerator(name = "makina_seq", sequenceName = "makina_seq", allocationSize = 1)
    //otomatik id yi generate etmeye yarar AUTO da olur
    //@Column(name = "id")
    private Long id;

    @Column(name = "makina_adi")
    private String makinaAdi;
    @Column(name = "makina_adet")
    private Integer makinaAdet;

    @Column(name = "makina_fiyat")
    private Double makinaFiyat;
    @Column(name = "makina_tarih")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date makinaTarih;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMakinaAdi() {
        return makinaAdi;
    }

    public void setMakinaAdi(String makinaAdi) {
        this.makinaAdi = makinaAdi;
    }

    public Integer getMakinaAdet() {
        return makinaAdet;
    }

    public void setMakinaAdet(Integer makinaAdet) {
        this.makinaAdet = makinaAdet;
    }

    public Double getMakinaFiyat() {
        return makinaFiyat;
    }

    public void setMakinaFiyat(Double makinaFiyat) {
        this.makinaFiyat = makinaFiyat;
    }

    public Date getMakinaTarih() {
        return makinaTarih;
    }

    public void setMakinaTarih(Date makinaTarih) {
        this.makinaTarih = makinaTarih;
    }
}
