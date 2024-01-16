package com.tknkservice.service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "musteri", schema = "public")
@JsonIgnoreProperties("hibernateLazyInitializer")


public class Musteri {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "musteri_seq")
    @SequenceGenerator(name = "musteri_seq", sequenceName = "musteri_seq", allocationSize = 1)
    //otomatik id yi generate etmeye yarar AUTO da olur
    //@Column(name = "id")
    private Long id;

    @Column(name = "musteri_ad")
    private String musteriAd;
    @Column(name = "musteri_soyad")
    private String musteriSoyad;
    @Column(name = "musteri_kayit_tarihi")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date musteriKayitTarihi;
    @Column(name = "musteri_telefon_no")
    private String musteriTelefonNo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMusteriAd() {
        return musteriAd;
    }

    public void setMusteriAd(String musteriAd) {
        this.musteriAd = musteriAd;
    }

    public String getMusteriSoyad() {
        return musteriSoyad;
    }

    public void setMusteriSoyad(String musteriSoyad) {
        this.musteriSoyad = musteriSoyad;
    }

    public Date getMusteriKayitTarihi() {
        return musteriKayitTarihi;
    }

    public void setMusteriKayitTarihi(Date musteriKayitTarihi) {
        this.musteriKayitTarihi = musteriKayitTarihi;
    }

    public String getMusteriTelefonNo() {
        return musteriTelefonNo;
    }

    public void setMusteriTelefonNo(String musteriTelefonNo) {
        this.musteriTelefonNo = musteriTelefonNo;
    }
}
