package peerlink.peerlink.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;

@Service
public class RegisterService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    private void checkDuplicate(User user) {
        if (userRepo.findUserByUsername(user.getUsername()).isPresent()) {
            throw new DuplicateUserException();
        }
    }

    public void registerUser(User user) throws IllegalArgumentException {
        checkDuplicate(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }
}
