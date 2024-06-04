package peerlink.peerlink.security;

import lombok.Getter;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.security.jwt.JwtToken;

@Getter
public class Response {

    private final Integer code;
    private final String message;
    private final String status;
    private User user;
    private JwtToken token;

    private Response(Integer code, String message, String status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    private Response(Integer code, String message, String status, User user, JwtToken token) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.user = user;
        this.token = token;
    }


    public static Response authenticationSuccess(User user, JwtToken token) {
        return new Response(201, "", "success", user, token);
    }

    public static Response responseSuccess() {
        return new Response(201, "", "success");
    }

    public static Response duplicateUser() {
        return new Response(409, "duplicate user", "fail");
    }

    public static Response duplicateEmail() {
        return new Response(409, "duplicate email", "fail");
    }


    public static Response serverError() {
        return new Response(500, "Internal server error encountered", "fail");
    }

    public static Response loginFail() {
        return new Response(401, "Invalid username or password", "fail");
    }

    public static Response loginUnsuccessful() {
        return new Response(200, "Login success", "success");
    }

    public static Response unauthenticatedError() {
        return new Response(401, "authentication fail", "fail");
    }



}
