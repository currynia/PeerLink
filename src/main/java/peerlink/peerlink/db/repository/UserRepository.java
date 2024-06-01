package peerlink.peerlink.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import peerlink.peerlink.db.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{username:'?0'}")
    Optional<User> findUserByUsername(String username);

    @Query("{email:'?0'}")
    Optional<User> findUserByEmail(String email);

    long count();

}
