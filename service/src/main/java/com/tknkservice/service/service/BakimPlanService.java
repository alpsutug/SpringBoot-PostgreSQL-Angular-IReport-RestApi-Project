package com.tknkservice.service.service;

import com.tknkservice.service.model.BakimPlan;
import com.tknkservice.service.repository.BakimPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BakimPlanService {

    //    @Autowired
//    BakimPlanRepository bakimPlanRepository;
//
    final BakimPlanRepository bakimPlanRepository;

    public BakimPlanService(BakimPlanRepository bakimPlanRepository) {
        this.bakimPlanRepository = bakimPlanRepository;
    }


    public List<BakimPlan> getAllBakimPlanlar() {
        return bakimPlanRepository.findAll();
    }


    public boolean removeBakimPlanById(long bakimPlanId) {
        bakimPlanRepository.deleteById(bakimPlanId);
        return true;
    }

    public BakimPlan bakimPlanKaydet(BakimPlan bakimPlan) {
        return bakimPlanRepository.save(bakimPlan);
    }

    public BakimPlan bakimPlanDuzelt(long bakimPlanId, BakimPlan bakimPlanData) {
        BakimPlan bakimPlan = bakimPlanRepository.getReferenceById(bakimPlanId);
        bakimPlan.setBakimTuru(bakimPlanData.getBakimTuru());
        bakimPlan.setBakimTarihi(bakimPlanData.getBakimTarihi());
        bakimPlan.setBakimMaliyet(bakimPlanData.getBakimMaliyet());
        bakimPlan.setBakimDurumu(bakimPlanData.getBakimDurumu());

        return bakimPlanRepository.save(bakimPlan);

    }

    public List<BakimPlan> findAllByBakimTuruContainingIgnoreCase(String query) {
        return bakimPlanRepository.findAllByBakimTuruContainingIgnoreCase(query);
    }
}
