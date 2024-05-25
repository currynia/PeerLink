package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.services.RegisterService;

@RestController
class RegisterController {
    @Autowired
    RegisterService registerService;

    @PostMapping(value = "/api/register", consumes = "application/json")
    private String register(@RequestBody User user) {
        try {
            registerService.registerUser(user);
            return "success";
        } catch (IllegalArgumentException e) {
            return "fail";
        }
    }

}
