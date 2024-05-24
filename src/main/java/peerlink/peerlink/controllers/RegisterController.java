package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import peerlink.peerlink.db.repository.UserRepository;

@RestController
public class RegisterController {
    @Autowired
    UserRepository userRepo;

}
