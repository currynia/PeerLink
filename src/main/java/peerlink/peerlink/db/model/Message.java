package peerlink.peerlink.db.model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("messages")
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
  @Id private String id;
  private String sender;
  private String receiver;
  private String content;
  private Date timeStamp;
}
