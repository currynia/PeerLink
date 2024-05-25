package peerlink.peerlink.security;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException() {
        super("Duplicate user found");
    }
}
