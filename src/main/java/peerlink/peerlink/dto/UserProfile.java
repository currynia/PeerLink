package peerlink.peerlink.dto;

import java.util.List;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfile {
    private String username;
    private String email;
    private int age;
    private String gender;
    private String major;
    private List<String> modules;
}
