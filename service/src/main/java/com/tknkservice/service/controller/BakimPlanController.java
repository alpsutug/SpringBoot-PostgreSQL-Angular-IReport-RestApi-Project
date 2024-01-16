package com.tknkservice.service.controller;

import com.tknkservice.service.model.BakimPlan;
import com.tknkservice.service.service.BakimPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/bakimplan")
public class BakimPlanController {

    @Autowired
    BakimPlanService bakimPlanService;


    @GetMapping("/bakimplanlar")
    public List<BakimPlan> getBakimPlanlar(@RequestParam(value = "query", required = false) String query) {
        if (query != null && !query.isEmpty()) {
            return bakimPlanService.findAllByBakimTuruContainingIgnoreCase(query);
        } else {
            return bakimPlanService.getAllBakimPlanlar();
        }

    }

    @PostMapping("/bakimplanlar")
    public BakimPlan bakimplanKaydet(@RequestBody BakimPlan bakimPlan) {
        return bakimPlanService.bakimPlanKaydet(bakimPlan);
    }


    @PutMapping("/bakimplanlar")
    public BakimPlan bakimPlanDuzelt(@RequestParam long bakimPlanId, @RequestBody BakimPlan bakimPlan) {
        return bakimPlanService.bakimPlanDuzelt(bakimPlanId, bakimPlan);
    }


    @DeleteMapping("/delete")
    public boolean removeBakimPlanById(@RequestParam long bakimPlanId) {
        return bakimPlanService.removeBakimPlanById(bakimPlanId);
    }

}