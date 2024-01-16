package com.tknkservice.service.controller;

import com.tknkservice.service.model.User;
import com.tknkservice.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/kullanici")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/login")
    public Map<String, Object> getLogin(@RequestParam String userName, @RequestParam String password) {
        Map<String, Object> m = new HashMap<>();
        Boolean result = userService.getLogin(userName, password);
        if (result) {
            List<User> lstUser = userService.getUserByUserName(userName);
            if (lstUser.size() > 0) {
                m.put("user", lstUser.get(0));

            }
            m.put("token", "thisisJNTtoken");

            m.put("success", "true");
            return m;

        } else {
            m.put("success", "false");
            m.put("hata", "Kullanici kodu veya parolasi hatali");
            return m;
        }


    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();


    }


    @PostMapping("/add-user")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);


    }

 /*
    @PostMapping("/user-add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(user.getUsername() + " adlı kullanıcı eklendi...");
    }

 */



    /*
    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        Long userId = user.getId();

        // Check if the user with the given ID already exists
        if (userRepository.existsById(userId)) {
            return ResponseEntity.badRequest().body("User with ID " + userId + " already exists.");
        } else {
            // User doesn't exist, proceed with adding
            User addedUser = userService.addUser(user);
            if (addedUser != null) {
                return ResponseEntity.ok("User with ID " + userId + " added successfully.");
            } else {
                return ResponseEntity.status(500).body("Error adding the user.");
            }
        }
    }


     */


    /* ödev

    getbyid,update ,delete metodları ödev endpointlerden postmande göstercez


     */
    @GetMapping("/userid/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/user-update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/user-delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(id + " id li kişi silindi...");
    }


}
