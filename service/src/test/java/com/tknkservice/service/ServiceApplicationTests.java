package com.tknkservice.service;

import com.tknkservice.service.model.User;
import com.tknkservice.service.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServiceApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    void contextLoads() {
    }

    @Test
    public void testAdminKullaniciVarmi() {
        User user = userRepository.findById(1L).orElse(null);
        Assertions.assertEquals(user.getAdi(), "Admin");

    }


	/*
	@Test
	public void testNormalKullaniciVarmi() {
		User user = userRepository.findById(2L).orElse(null);
		Assertions.assertEquals(user.getAdi(), "Normal");
	}

	 */


}
