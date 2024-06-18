import { useEffect } from "react";
import { useStompClient } from "react-stomp-hooks";
import ChatDict from "./ChatDict";
import { ChatDto, Message } from "./ChatDto";

interface Props {
  setPublishHandler: (fn: () => (msg: ChatDto) => void) => void;
  chatDict: ChatDict;
  setChatDict: (chatDict: ChatDict) => void;
}
const ChatPublisher = (props: Props) => {
  const [chatDict, setChatDict, setPublishHandler] = [
    props.chatDict,
    props.setChatDict,
    props.setPublishHandler,
  ];
  const stompClient = useStompClient();
  useEffect(() => {
    const publishMessage = (msg: ChatDto) => {
      if (stompClient) {
        stompClient.publish({
          destination: "/app/chat",
          body: JSON.stringify(msg),
        });

        const newDict = chatDict.addMessage(msg.message.receiver, msg.message);

        setChatDict(newDict);
      }
    };

    setPublishHandler(() => publishMessage);
  }, [stompClient, chatDict, setChatDict, setPublishHandler]);

  return null;
};
export default ChatPublisher;
