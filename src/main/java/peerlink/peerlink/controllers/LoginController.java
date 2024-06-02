package peerlink.peerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.dto.LoginDto;
import peerlink.peerlink.security.Response;
import peerlink.peerlink.security.jwt.JwtService;
import peerlink.peerlink.services.AuthenticationService;


@RestController
class LoginController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationService authService;

    @PostMapping(value = "/api/login", consumes = "application/json")
    private Response login(@RequestBody LoginDto loginDto) {
        try {
            User user = authService.authenticateLogin(loginDto);
            String jwtToken = jwtService.generateToken(user);
            return Response.loginSuccess(user);
        } catch (BadCredentialsException e) {
            return Response.loginFail();
        }
    }


}
