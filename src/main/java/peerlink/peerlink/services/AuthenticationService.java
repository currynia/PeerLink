package peerlink.peerlink.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.dto.LoginDto;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    public User authenticateLogin(LoginDto loginDto) throws BadCredentialsException {
        try {
            User user = loginDto.getUsername().contains("@")
                    ? userRepository.findUserByEmail(loginDto.getUsername()).get()
                    : userRepository.findUserByUsername(loginDto.getUsername()).get();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUsername(), loginDto.getPassword()));
            return user;

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(null);
        }

    }
}
