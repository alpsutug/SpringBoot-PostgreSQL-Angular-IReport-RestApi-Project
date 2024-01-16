package com.tknkservice.service.repository;

import com.tknkservice.service.model.Makina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MakinaRepository extends JpaRepository<Makina, Long> {

    List<Makina> findAllByMakinaAdiContainingIgnoreCase(String makinaAdi);


}
