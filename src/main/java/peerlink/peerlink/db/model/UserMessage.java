package peerlink.peerlink.db.model;

import java.util.HashMap;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("userMessage")
@AllArgsConstructor
public class UserMessage {
  @Id private String username;

  private HashMap<String, List<String>> chatMessageMap;
}
