package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.security.DuplicateUserException;
import peerlink.peerlink.security.RegisterService;

@RestController
class RegisterController {
    private static final String RESPONSE_SUCCESS = "{'status':'success', 'message':null,}";
    private static final String DUPLICATE_USER = "{'status':'fail', 'message':'user exists',}";
    private static final String DUPLICATE_EMAIL = "{'status':'fail', 'message':'email exists',}";
    private static final String FAIL = "{'status':'fail', 'message':'failed due to an internal error',}";
    @Autowired
    RegisterService registerService;

    @PostMapping(value = "/api/register", consumes = "application/json")
    private String register(@RequestBody User user) {
        try {
            registerService.registerUser(user);
            return RESPONSE_SUCCESS;
        } catch (DuplicateUserException e) {
            return DUPLICATE_USER;
        } catch (DuplicateKeyException e) {
            return DUPLICATE_EMAIL;
        } catch (IllegalArgumentException e) {
            return FAIL;
        }
    }

}
