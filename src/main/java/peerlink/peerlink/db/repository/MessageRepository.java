package peerlink.peerlink.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import peerlink.peerlink.db.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {}
