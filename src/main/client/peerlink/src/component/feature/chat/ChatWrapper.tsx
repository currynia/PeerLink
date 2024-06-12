import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import ChatDict from "./ChatDict";
import { ChatDto, Message } from "./ChatDto";
import ChatListener from "./ChatListener";
import ChatPublisher from "./ChatPublisher";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddDialog from "./AddDialog";
import { ApiAccess } from "../../../api/ApiAccess";
import UserDetails from "../../../UserDetails";

const ChatWrapper = () => {
  const [chatDict, setChatDict] = useState<ChatDict>(new ChatDict());
  const [selectedPerson, setSelectedPerson] = useState("");

  const [publishHandler, setPublishHandler] = useState<
    () => (msg: ChatDto) => void
  >(() => (_: ChatDto) => {});

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const [selectedIndex, setSelectedIndex] = useState(1);
  useEffect(() => {
    (async () => {
      const response = await ApiAccess.retrieveChatHistory(
        UserDetails.getUsername(),
        UserDetails.getToken()
      );
      setChatDict(ChatDict.parsefromApi(response));
    })();
  }, []);

  return (
    <>
      <AddDialog
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        setChatDict={setChatDict}
        chatDict={chatDict}
      />
      <ChatPublisher
        setPublishHandler={setPublishHandler}
        setChatDict={setChatDict}
        chatDict={chatDict}
      />
      <ChatListener chatDict={chatDict} setChatDict={setChatDict} />
      <Box id="chatwrapper" display="flex" flexDirection={"row"} width={1}>
        <Box width={"20%"} display="flex" flexDirection={"column"}>
          <Box alignSelf={"flex-end"}>
            <IconButton
              aria-label="addFriend"
              onClick={() => setOpenAddDialog(true)}
            >
              <PersonAddAlt1Icon />
            </IconButton>
          </Box>

          <List>
            {chatDict.getPeople().map((name) => (
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => {
                  setSelectedPerson(name);
                  handleListItemClick(event, 0);
                }}
              >
                <ListItem>
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Divider orientation="vertical" />

        <Paper sx={{ height: 1, flexGrow: 1 }}>
          <ChatBox
            chatDict={chatDict}
            person={selectedPerson}
            publishHandler={publishHandler}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ChatWrapper;
