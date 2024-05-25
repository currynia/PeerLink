package peerlink.peerlink.db.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document("users")
public class User {
    @Id
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password;

    private int age;

    private String gender;

    private String major;

    public User(String username, String email, String password, int age, String gender, String major) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.major = major;
    }
}