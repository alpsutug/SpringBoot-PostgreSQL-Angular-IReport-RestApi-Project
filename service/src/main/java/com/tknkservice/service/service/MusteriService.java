package com.tknkservice.service.service;

import com.tknkservice.service.model.Musteri;
import com.tknkservice.service.repository.MusteriRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusteriService {

    //    @Autowired
//    MusteriRepository musteriRepository;
//
    final MusteriRepository musteriRepository;

    public MusteriService(MusteriRepository musteriRepository) {
        this.musteriRepository = musteriRepository;
    }

    public List<Musteri> getAllMusteriler() {
        return musteriRepository.findAll();
    }


    public boolean removeMusteriById(long musteriId) {
        musteriRepository.deleteById(musteriId);
        return true;
    }

    public Musteri musteriKaydet(Musteri musteri) {
        return musteriRepository.save(musteri);
    }

    public Musteri musteriDuzelt(long musteriId, Musteri musteriData) {
        Musteri musteri = musteriRepository.getReferenceById(musteriId);
        musteri.setMusteriAd(musteriData.getMusteriAd());
        musteri.setMusteriSoyad(musteriData.getMusteriSoyad());
        musteri.setMusteriKayitTarihi(musteriData.getMusteriKayitTarihi());
        musteri.setMusteriTelefonNo(musteriData.getMusteriTelefonNo());

        return musteriRepository.save(musteri);

    }

    public List<Musteri> findAllByMusteriAdContainingIgnoreCase(String query) {
        return musteriRepository.findAllByMusteriAdContainingIgnoreCase(query);
    }

}
