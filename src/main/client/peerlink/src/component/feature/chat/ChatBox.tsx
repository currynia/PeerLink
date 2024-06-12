import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import UserDetails from "../../../UserDetails";
import ChatDict from "./ChatDict";
import { ChatDto, Message } from "./ChatDto";

interface Props {
  publishHandler: (msg: ChatDto) => void;
  person: string;
  chatDict: ChatDict;
}

const ChatBox = (props: Props) => {
  const [msg, setMsg] = useState("");

  const sendMessage = (msg: string) => {
    if (msg.trim()) {
      const newMessage = new ChatDto(
        new Message(UserDetails.getUsername(), props.person, msg),
        localStorage.getItem("token") as string
      );

      props.publishHandler(newMessage);
      setMsg("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <List sx={{ flexGrow: 1 }}>
        {props.chatDict.getMessages(props.person).map((chat, index) => (
          <ListItemText key={index}>{chat.content}</ListItemText>
        ))}
      </List>

      <Divider orientation="horizontal" />
      <Box display="flex" alignItems="center" p={1}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Message"
          variant="standard"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <Button onClick={() => sendMessage(msg)}>Send</Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
