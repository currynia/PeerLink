package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import peerlink.peerlink.controllers.response.Response;
import peerlink.peerlink.db.repository.UserRepository;

@RestController
class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepo;

    @PostMapping(value = "/api/login", consumes = "application/json")
    private Response login(@RequestBody LoginData loginData) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginData.username, loginData.password));
            return Response.getLoginSuccessful();
        } catch (BadCredentialsException e) {
            return Response.getLoginFail();
        }
    }

    private static class LoginData {
        private final String username;
        private final String password;

        public LoginData(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }
}
