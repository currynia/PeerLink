package peerlink.peerlink.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import peerlink.peerlink.db.model.User;


public interface UserRepository extends MongoRepository<User, String> {
    @Query("{username:'?0'}")
    User findUserByUsername(String username);

    @Query("{email:'?0'}")
    User findUserByEmail(String email);

    long count();

}
