package com.tknkservice.service.repository;

import com.tknkservice.service.model.BakimPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BakimPlanRepository extends JpaRepository<BakimPlan, Long> {


    List<BakimPlan> findAllByBakimTuruContainingIgnoreCase(String bakimTuru);
}
