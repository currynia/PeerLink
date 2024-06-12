import { StompSessionProvider } from "react-stomp-hooks";
import ChatChild from "./ChatChild";

const Chat = () => {
  return (
    <StompSessionProvider url={"/handle/chat-endpoint"}>
      <ChatChild />
    </StompSessionProvider>
  );
};

export default Chat;
