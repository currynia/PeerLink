package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import peerlink.peerlink.db.model.User;
import peerlink.peerlink.security.DuplicateUserException;
import peerlink.peerlink.security.RegisterService;
import peerlink.peerlink.security.Response;

@RestController
class RegisterController {
    @Autowired
    RegisterService registerService;

    @PostMapping(value = "/api/register", consumes = "application/json")
    private Response register(@RequestBody User user) {
        try {
            registerService.registerUser(user);
            return Response.getResponseSuccess();
        } catch (DuplicateUserException e) {
            return Response.getDuplicateEmail();
        } catch (DuplicateKeyException e) {
            return Response.getDuplicateUser();
        } catch (IllegalArgumentException e) {
            return Response.getServerError();
        }

    }

}
