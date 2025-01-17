package peerlink.peerlink.controllers.api;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.Message;
import peerlink.peerlink.db.model.UserMessage;
import peerlink.peerlink.db.repository.MessageRepository;
import peerlink.peerlink.db.repository.UserMessageRepository;
import peerlink.peerlink.dto.ChatDto;
import peerlink.peerlink.dto.UserDto;
import peerlink.peerlink.dto.UserMessageDto;
import peerlink.peerlink.security.jwt.JwtService;

@RestController
public class ChatController {
  @Autowired SimpMessagingTemplate messagingTemplate;

  @Autowired JwtService jwtService;

  @Autowired MessageRepository messageRepository;

  @Autowired UserMessageRepository userMsgRepo;

  @PostMapping(value = "/api/chat/history", consumes = "application/json")
  public List<UserMessageDto> getAllChats(@RequestBody UserDto userDto) {
    String jwt = userDto.getJwtToken();
    if (jwtService.isTokenValid(jwt)
        && Objects.equals(jwtService.extractUsername(jwt), userDto.getUsername())) {

      return userMsgRepo.getUserMessagesWithDetails(userDto.getUsername());
    }
    return null;
  }

  @PostMapping(value = "/api/chat/test", consumes = "application/json")
  public void test(@RequestBody UserDto userDto) {

    System.out.println(userMsgRepo.getUserMessagesWithDetails(userDto.getUsername()));
  }

  @MessageMapping("/chat")
  public void reply(@Payload ChatDto chatDto) {
    Message message = chatDto.getMessage();
    String jwt = chatDto.getJwtToken();
    String receiver = message.getReceiver();
    String sender = message.getSender();
    if (jwtService.isTokenValid(jwt)
        && Objects.equals(jwtService.extractUsername(jwt), message.getSender())) {
      String id = messageRepository.save(message).getId();
      addMessages(sender, receiver, id);
      addMessages(receiver, sender, id);
      messagingTemplate.convertAndSendToUser(message.getReceiver(), "/queue/messages", message);
    }
  }

  private void addMessages(String sender, String receiver, String id) {
    UserMessage user = userMsgRepo.findUserByUsername(sender);
    if (user == null) {
      user = new UserMessage(sender, new HashMap<>());
      userMsgRepo.save(user);
    }
    user.getChatMessageMap().computeIfAbsent(receiver, k -> new ArrayList<>(List.of(id))).add(id);
    userMsgRepo.save(user);
  }
}
