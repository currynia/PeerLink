package peerlink.peerlink.services;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException() {
        super("Duplicate user found");
    }
}
