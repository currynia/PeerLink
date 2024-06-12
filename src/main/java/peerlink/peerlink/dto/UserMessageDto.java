package peerlink.peerlink.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import peerlink.peerlink.db.model.Message;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserMessageDto {
  private String id;
  private List<Message> results;
}
