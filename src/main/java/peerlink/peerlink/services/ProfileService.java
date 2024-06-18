package peerlink.peerlink.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.dto.UserProfile;


@Service
public class ProfileService {
    @Autowired
    UserRepository userRepository;

    public User getUser(String username){
        return userRepository.findById(username).get();
    }
    
    public void updateUser(UserProfile updatedProfile) {
        User existing = userRepository.findById(updatedProfile.getUsername()).get();
        existing.setAge(updatedProfile.getAge());
        existing.setMajor(updatedProfile.getMajor());
        existing.setModules(updatedProfile.getModules());
        userRepository.save(existing);
    }

    public List<User> filterUser(String gender, String module, String fac) {
        return userRepository.findUserByFilter(gender, module, fac);
    }


}
