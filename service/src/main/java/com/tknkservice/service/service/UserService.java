package com.tknkservice.service.service;

import com.tknkservice.service.model.User;
import com.tknkservice.service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

//    @Autowired
//    UserRepository userRepository;

    final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean getLogin(String username, String password) {
        List<User> users = userRepository.getUserByUsernameEquals(username);

        for (User user : users) {
            if (user.getPassword() != null && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
       /* StringBuilder sb = new StringBuilder();
        sb.append("UserName|Adı|Soyadı\n");
        for (User user : users) {
            sb.append(user.getUsername() + "|" + user.getAdi() + "|" + user.getSoyadi()
                    + "|" + " \n");
        }
        return sb.toString();

        */

        return users;
    }



        /* uzun hali
        Boolean kullaniciBulundu = false;
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            if (user.getPassword() != null && user.getPassword().equals(password)) {
                kullaniciBulundu = true;
                break;
            }
        }
        return kullaniciBulundu;
}
        */


    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);

    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.getReferenceById(id);
        if (existingUser != null) {
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            existingUser.setAdi(user.getAdi());
            existingUser.setSoyadi(user.getSoyadi());
            existingUser.setDogumTarihi(user.getDogumTarihi());
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public void deleteUser(Long id) {
        userRepository.delete(userRepository.getReferenceById(id)); //getbyıd yerine
    }


    public User addUser(User user) {
        User existingUser = new User();

        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setAdi(user.getAdi());
        existingUser.setSoyadi(user.getSoyadi());
        existingUser.setDogumTarihi(user.getDogumTarihi());
        return userRepository.save(existingUser);


    }


    public List<User> getUserByUserName(String userName) {
        List<User> users = userRepository.getUserByUsernameEquals(userName);
        return users;

    }

 /*
    public void saveUser(User user) {
        userRepository.save(user);
    }


  */


}
