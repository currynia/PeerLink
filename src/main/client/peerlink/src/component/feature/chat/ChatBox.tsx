import {
  Box,
  Button,
  Divider,
  List,
  Paper,
  TextField,
  Typography,
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
    <Box display="flex" flexDirection="column" height="100%" width="80%">
      <List
        sx={{
          overflow: "auto",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {props.chatDict.getMessages(props.person).map((chat, index) => (
          <Box
            marginLeft={props.person === chat.sender ? 2 : 0}
            marginRight={props.person === chat.sender ? 0 : 2}
            marginBottom={1.5}
            alignSelf={props.person === chat.sender ? "flex-start" : "flex-end"}
            maxWidth={"80%"}
          >
            <Paper
              variant="elevation"
              elevation={3}
              sx={{
                backgroundColor: props.person === chat.sender ? "#EBF5EB" : "",
                padding: 1,
              }}
            >
              <Typography sx={{ wordWrap: "break-word" }}>
                {chat.content}
              </Typography>
            </Paper>
          </Box>
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
