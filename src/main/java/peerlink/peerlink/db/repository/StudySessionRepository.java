package peerlink.peerlink.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import peerlink.peerlink.db.model.StudySession;

public interface StudySessionRepository extends MongoRepository<StudySession, String> {
    @Query("{user:'?0'}")
    List<StudySession> findSessionByUsername(String username);
}
