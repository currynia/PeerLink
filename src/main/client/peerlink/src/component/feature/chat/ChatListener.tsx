import { useSubscription } from "react-stomp-hooks";
import UserDetails from "../../../UserDetails";
import ChatDict from "./ChatDict";
import { Message } from "./ChatDto";

interface Props {
  chatDict: ChatDict;
  setChatDict: (dict: ChatDict) => void;
}

const ChatListener = (props: Props) => {
  const currentUser = UserDetails.getUsername();
  const chatDict = props.chatDict;
  useSubscription(`/user/${currentUser}/queue/messages`, (message) => {
    const messageObj = JSON.parse(message.body);
    const receiver = messageObj.receiver;
    const sender = messageObj.sender;
    const content = messageObj.content;

    const chatObject = new Message(sender, receiver, content);
    console.log(content);
    var newDict: ChatDict;
    if (receiver === currentUser) {
      newDict = chatDict.addMessage(sender, chatObject);
    } else {
      newDict = chatDict.addMessage(receiver, chatObject);
    }
    props.setChatDict(newDict);
  });

  return null;
};

export default ChatListener;
