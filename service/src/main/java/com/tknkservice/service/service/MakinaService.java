package com.tknkservice.service.service;

import com.tknkservice.service.model.Makina;
import com.tknkservice.service.repository.MakinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MakinaService {

    //    @Autowired
//    MakinaRepository makinaRepository;
//
    final MakinaRepository makinaRepository;

    public MakinaService(MakinaRepository makinaRepository) {
        this.makinaRepository = makinaRepository;
    }


    public List<Makina> getAllMakinalar() {
        return makinaRepository.findAll();
    }


    public boolean removeMakinaById(long makinaId) {
        makinaRepository.deleteById(makinaId);
        return true;
    }

    public Makina makinaKaydet(Makina makina) {
        return makinaRepository.save(makina);
    }

    public Makina makinaDuzelt(long makinaId, Makina makinaData) {
        Makina makina = makinaRepository.getReferenceById(makinaId);
        makina.setMakinaAdi(makinaData.getMakinaAdi());
        makina.setMakinaAdet(makinaData.getMakinaAdet());
        makina.setMakinaFiyat(makinaData.getMakinaFiyat());
        makina.setMakinaTarih(makinaData.getMakinaTarih());

        return makinaRepository.save(makina);

    }

    public List<Makina> findAllByMakinaAdiContainingIgnoreCase(String query) {
        return makinaRepository.findAllByMakinaAdiContainingIgnoreCase(query);
    }
}
