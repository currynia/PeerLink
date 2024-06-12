package peerlink.peerlink.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import peerlink.peerlink.db.model.Message;

@Getter
@Setter
@ToString
public class ChatDto {
  private Message message;
  private String jwtToken;
}
