package peerlink.peerlink.db.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Document("users")
public class User implements UserDetails {
    @Id
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password;

    private int age;

    private String gender;

    private String major;

    private List<String> tasks;

    public User() {
    }
    
    private User(String username, String email, String password, int age, String gender,
                 String major) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.major = major;
    }

    public static UserDetails buildUserDetails(User user) {
        return new User(user.getUsername(), user.getEmail(), user.getPassword(), user.getAge(),
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

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", major='" + major + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}
