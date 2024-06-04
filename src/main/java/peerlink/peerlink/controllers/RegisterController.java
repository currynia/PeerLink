package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.security.DuplicateUserException;
import peerlink.peerlink.security.Response;
import peerlink.peerlink.services.RegisterService;

@RestController
class RegisterController {
    @Autowired
    RegisterService registerService;

    @PostMapping(value = "/api/register", consumes = "application/json")
    private Response register(@RequestBody User user) {
        try {
            registerService.registerUser(user);
            return Response.responseSuccess();
        } catch (DuplicateUserException e) {
            return Response.duplicateEmail();
        } catch (DuplicateKeyException e) {
            return Response.duplicateUser();
        } catch (IllegalArgumentException e) {
            return Response.serverError();
        }

    }

}
