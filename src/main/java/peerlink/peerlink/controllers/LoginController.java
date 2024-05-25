package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.repository.UserRepository;

@RestController
class LoginController {

    @Autowired
    UserRepository userRepo;

//    @PostMapping(value = "/login")
//    private String login(@RequestBody) {
//
//    }


}
