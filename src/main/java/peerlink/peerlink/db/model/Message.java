package peerlink.peerlink.db.model;

import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Message {
  private String sender;
  private String receiver;
  private String content;
  private Date timeStamp;
}
