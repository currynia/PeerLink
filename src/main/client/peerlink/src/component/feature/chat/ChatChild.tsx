import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";

const ChatChild = () => {
  const [message, setMessage] = useState("");
  // Subscribe to the topic that we have opened in our spring boot app
  useSubscription("/app/chat/reply", (message) => {
    setMessage(message.body);
  });

  return <div> The broadcast message from websocket broker is {message}</div>;
};

export default ChatChild;
