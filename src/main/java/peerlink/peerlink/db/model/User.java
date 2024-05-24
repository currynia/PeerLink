package peerlink.peerlink.db.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document("users")
public class User {
    @Id
    @Setter
    @Getter
    private String username;

    @Indexed(unique = true)
    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private int age;

    @Setter
    @Getter
    private String gender;

    @Setter
    @Getter
    private String major;

    public User(String username, String email, int age, String gender, String major) {
        this.username = username;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.major = major;
    }

}