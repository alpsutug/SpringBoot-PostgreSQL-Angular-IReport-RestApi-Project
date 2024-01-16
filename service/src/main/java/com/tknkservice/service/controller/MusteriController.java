package com.tknkservice.service.controller;

import com.tknkservice.service.model.Musteri;
import com.tknkservice.service.service.MusteriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/musteri")
public class MusteriController {

    @Autowired
    MusteriService musteriService;


    @GetMapping("/musteriler")
    public List<Musteri> getMusteriler(@RequestParam(value = "query", required = false) String query) {
        if (query != null && !query.isEmpty()) {
            return musteriService.findAllByMusteriAdContainingIgnoreCase(query);
        } else {
            return musteriService.getAllMusteriler();
        }

    }

    @PostMapping("/musteriler")
    public Musteri musteriKaydet(@RequestBody Musteri musteri) {
        return musteriService.musteriKaydet(musteri);
    }


    @PutMapping("/musteriler")
    public Musteri musteriDuzelt(@RequestParam long musteriId, @RequestBody Musteri musteri) {
        return musteriService.musteriDuzelt(musteriId, musteri);
    }


    @DeleteMapping("/delete")
    public boolean removeMusteriById(@RequestParam long musteriId) {
        return musteriService.removeMusteriById(musteriId);
    }
}