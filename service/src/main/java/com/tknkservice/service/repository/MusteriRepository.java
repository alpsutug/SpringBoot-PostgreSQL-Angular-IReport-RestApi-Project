package com.tknkservice.service.repository;

import com.tknkservice.service.model.Musteri;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusteriRepository extends JpaRepository<Musteri, Long> {

    List<Musteri> findAllByMusteriAdContainingIgnoreCase(String musteriAd);

}
