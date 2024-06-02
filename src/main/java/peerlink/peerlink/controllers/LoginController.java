package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.Setter;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.security.Response;

@RestController
class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/api/login", consumes = "application/json")
    private Response login(@RequestBody LoginData loginData) {
        try {

            loginData.username = loginData.username.contains("@")
                    ? userRepository.findUserByEmail(loginData.username).get().getUsername()
                    : loginData.username;

            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginData.username, loginData.password));
            return Response.getResponseSuccess();
        } catch (BadCredentialsException e) {
            return Response.getLoginFail();
        }
    }

    private static class LoginData {
        private String username;
        private final String password;

        @SuppressWarnings("unused")
        public LoginData(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }
}
