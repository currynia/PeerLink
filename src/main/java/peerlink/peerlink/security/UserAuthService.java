package peerlink.peerlink.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import peerlink.peerlink.db.repository.UserRepository;

@Service
public class UserAuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UserDetailsIm.buildUserDetails(userRepository.
                findUserByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException("Username not found")));

    }


}
