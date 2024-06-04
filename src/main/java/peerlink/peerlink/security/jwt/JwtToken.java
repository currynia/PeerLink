package peerlink.peerlink.security.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtToken {
    public String token;
    public long duration;

    public JwtToken(String token, long duration) {
        this.token = token;
        this.duration = duration;
    }
}
