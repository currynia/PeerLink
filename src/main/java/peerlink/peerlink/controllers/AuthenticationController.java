package peerlink.peerlink.controllers;

import javax.naming.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.security.Response;
import peerlink.peerlink.security.jwt.JwtToken;
import peerlink.peerlink.services.AuthenticationService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;

@RestController
public class AuthenticationController {
    @Autowired
    AuthenticationService authService;


    @GetMapping("/auth")
    public Response authenticate(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            Pair<User, JwtToken> userTokenPair = authService.authenticateToken(token);

            return Response.authenticationSuccess(userTokenPair.getFirst(),
                    userTokenPair.getSecond());
        } catch (SignatureException e) {
            return Response.unauthenticatedError();
        } catch (ExpiredJwtException e) {
            return Response.unauthenticatedError();
        } catch (MalformedJwtException e) {
            return Response.unauthenticatedError();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError();
        }
    }

}
