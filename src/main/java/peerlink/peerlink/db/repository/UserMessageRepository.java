package peerlink.peerlink.db.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import peerlink.peerlink.db.model.UserMessage;
import peerlink.peerlink.dto.UserMessageDto;

public interface UserMessageRepository extends MongoRepository<UserMessage, String> {
  @Aggregation(
      pipeline = {
        "{ $match: { _id: '?0' } }",
        "{ $project: { chatMessageMap: { $objectToArray: \"$chatMessageMap\" } } }",
        "{ $unwind: { path: \"$chatMessageMap\" } }",
        "{ $project: { \"chatMessageMap.k\": \"$chatMessageMap.k\", \"chatMessageMap.v\": { $map: { input: \"$chatMessageMap.v\", as: \"msgId\", in: { $toObjectId: \"$$msgId\" } } } } }",
        "{ $unwind: { path: \"$chatMessageMap.v\" } }",
        "{ $lookup: { from: \"messages\", localField: \"chatMessageMap.v\", foreignField: \"_id\", as: \"result\" } }",
        "{ $unwind: { path: \"$result\" } }",
        "{ $group: { _id: \"$chatMessageMap.k\", results: { $push: { sender: \"$result.sender\", receiver: \"$result.receiver\", content: \"$result.content\" } } } }"
      })
  List<UserMessageDto> getUserMessagesWithDetails(String username);

  @Query("{_id:'?0'}")
  UserMessage findUserByUsername(String username);
}
