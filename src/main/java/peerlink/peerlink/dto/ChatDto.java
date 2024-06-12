package peerlink.peerlink.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatDtoReceive {
  private String sender;
  private String receiver;
  private String content;
  private String jwtToken;
}
