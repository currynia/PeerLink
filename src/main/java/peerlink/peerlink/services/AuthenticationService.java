package peerlink.peerlink.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.SignatureException;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.security.jwt.JwtService;
import peerlink.peerlink.security.jwt.JwtToken;

@Service
public class AuthenticationService {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtService jwtService;

        public Pair<User, JwtToken> authenticateLogin(String username, String password)
                        throws BadCredentialsException {


                User user = username.contains("@") ? userRepository.findUserByEmail(username).get()
                                : userRepository.findUserByUsername(username).get();

                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                                user.getUsername(), password));

                return Pair.of(user, new JwtToken(jwtService.generateToken(user),
                                jwtService.getExpirationTime()));


        }

        public Pair<User, JwtToken> authenticateToken(String token) throws SignatureException {
                User user = userRepository.findUserByUsername(jwtService.extractUsername(token))
                                .get();
                return Pair.of(user, new JwtToken(jwtService.generateToken(user),
                                jwtService.getExpirationTime()));


        }
}
