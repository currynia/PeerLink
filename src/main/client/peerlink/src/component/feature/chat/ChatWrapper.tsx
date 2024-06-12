import { StompSessionProvider } from "react-stomp-hooks";
import ChatChild from "./ChatChild";
import PublishComponent from "./PublishComponent";

const Chat = () => {
  return (
    <StompSessionProvider url={"/handle/chat-endpoint"}>
      <ChatChild />
      <PublishComponent />
    </StompSessionProvider>
  );
};

export default Chat;
