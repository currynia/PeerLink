package peerlink.peerlink.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.controllers.response.Response;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.security.DuplicateUserException;
import peerlink.peerlink.security.RegisterService;

@RestController
class RegisterController {
    private static final ObjectMapper mapper = new ObjectMapper();

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
