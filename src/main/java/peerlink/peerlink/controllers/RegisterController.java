package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;

@RestController
class RegisterController {
    @Autowired
    UserRepository userRepo;

    @PostMapping(value = "/api/register", consumes = "application/json")
    private String register(@RequestBody User user) {
        try {
            userRepo.save(user);
            return "success";
        } catch (IllegalArgumentException e) {
            return "fail";
        }
    }

}
