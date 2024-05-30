package peerlink.peerlink.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
import peerlink.peerlink.db.model.User;

@Getter
@Setter
public class UserDetailsIm implements UserDetails {
    private String username;

    private String email;

    private String password;

    private int age;

    private String gender;

    private String major;

    private UserDetailsIm(String username, String email, String password, int age, String gender, String major) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.major = major;
    }

    public static UserDetailsIm buildUserDetails(User user) {
        return new UserDetailsIm(
                user.getUsername(), user.getEmail(),
                user.getPassword(), user.getAge(),
                user.getGender(), user.getMajor());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
