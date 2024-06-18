package peerlink.peerlink.db.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import peerlink.peerlink.db.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{username:'?0'}")
    Optional<User> findUserByUsername(String username);

    @Query("{email:'?0'}")
    Optional<User> findUserByEmail(String email);

    @Query(value = "{username:'?0'}", fields = "{tasks : 1}")
    User findUserTasks(String username);

    @Aggregation(pipeline = {
        "{$match: {gender: ?0, modules: {$in: [?1]}, major: ?2}}"
    })
    List<User> findUserByFilter(String gender, String module, String major);


    // @Aggregation(pipeline = {
    //     "{ $match: {?#{ [0] == 'ANY' ? {} : {gender: ?0} } ,"+
    //         "?#{ [1] == 'ANY' ? {} : {modules: {$in: [?1]}} } ," +
    //         "?#{ [2] == 'ANY' ? {} : {major: ?2} }" +
    //     "} }"
    // })
    // List<User> findUserByFilter(String gender, String module, String major);


    // @Aggregation(pipeline = {
    //     "{$match: {" +
    //             (gender.equals("ANY") ? "{}" : "gender: ?0, ") +
    //             (module.equals("ANY") ? "{}" : "modules: {$in: [?1]}, ") +
    //             (major.equals("ANY") ? "{}" : "major: ?2") +
    //             "}}"
    // }) 
    // List<User> findUserByFilter(String gender, String module, String major);
    long count();

}
