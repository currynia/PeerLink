package peerlink.peerlink.controllers.response;

import lombok.Getter;

@Getter
public class Response {
    private Integer code;
    private String message;
    private String status;

    @Getter
    private static final Response responseSuccess = new ResponseSuccess();

    @Getter
    private static final Response duplicateUser = new DuplicateEmail();

    @Getter
    private static final Response duplicateEmail = new DuplicateUser();

    @Getter
    private static final Response serverError = new ServerError();

    public Response() {

    };

    private Response(Integer code, String message, String status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    private static class ResponseSuccess extends Response {

        private ResponseSuccess() {
            super(201, "created", "success");
        }
    }

    private static class DuplicateUser extends Response {

        private DuplicateUser() {
            super(409, "duplicate user", "fail");
        }
    }

    private static class DuplicateEmail extends Response {

        private DuplicateEmail() {
            super(409, "duplicate email", "fail");
        }
    }

    private static class ServerError extends Response {

        private ServerError() {
            super(500, "Internal server error encountered", "fail");
        }
    }

}
