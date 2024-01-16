package com.tknkservice.service.controller;

import com.tknkservice.service.model.Makina;
import com.tknkservice.service.service.MakinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/makina")
public class MakinaController {

    @Autowired
    MakinaService makinaService;


    @GetMapping("/makinalar")
    public List<Makina> getMakinalar(@RequestParam(value = "query",required = false) String query) {
        if(query != null && !query.isEmpty())
        {
            return  makinaService.findAllByMakinaAdiContainingIgnoreCase(query);
        }
        else {
            return makinaService.getAllMakinalar();
        }

    }

    @PostMapping("/makinalar")
    public Makina makinaKaydet(@RequestBody Makina makina)
    {
      return  makinaService.makinaKaydet(makina);
    }


    @PutMapping("/makinalar")
    public Makina makinaDuzelt(@RequestParam long makinaId,@RequestBody Makina makina)
    {
        return  makinaService.makinaDuzelt(makinaId,makina);
    }

    @DeleteMapping("/delete")
    public boolean removeMakinaById(@RequestParam long makinaId) {
        return makinaService.removeMakinaById(makinaId);
    }
}