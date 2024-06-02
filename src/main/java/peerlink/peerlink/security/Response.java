package peerlink.peerlink.security;

import lombok.Getter;
import peerlink.peerlink.db.model.User;

@Getter
public class Response {

    private final Integer code;
    private final String message;
    private final String status;
    private User user;

    public Response(Integer code, String message, String status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public Response(Integer code, String message, String status, User user) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.user = user;
    }

    public static Response loginSuccess(User user) {
        return new Response(201, "", "success", user);
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


}
