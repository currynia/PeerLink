export class Message {
  sender: string;
  receiver: string;
  content: string;
  constructor(
    sender: string = "",
    receiver: string = "",
    content: string = "",
    jwtToken: string = ""
  ) {
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
  }
}

export class ChatDto {
  message: Message;
  jwtToken: string;
  constructor(message: Message, jwtToken: string = "") {
    this.message = message;
    this.jwtToken = jwtToken;
  }
}
