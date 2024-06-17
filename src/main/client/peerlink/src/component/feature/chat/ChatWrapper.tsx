import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserDetails from "../../../UserDetails";
import { ApiAccess } from "../../../api/ApiAccess";
import AddDialog from "./AddDialog";
import ChatBox from "./ChatBox";
import ChatDict from "./ChatDict";
import { ChatDto } from "./ChatDto";
import ChatListener from "./ChatListener";
import ChatPublisher from "./ChatPublisher";

const ChatWrapper = () => {
  const [chatDict, setChatDict] = useState<ChatDict>(new ChatDict());
  const [selectedPerson, setSelectedPerson] = useState("");

  const [publishHandler, setPublishHandler] = useState<
    () => (msg: ChatDto) => void
  >(() => (_: ChatDto) => {});

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string
  ) => {
    setSelectedPerson(name);
    setSelectedIndex(index);
  };

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
      <Box
        id="chatwrapper"
        display="flex"
        flexDirection={"row"}
        width={"100%"}
        height={"100%"}
      >
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
            {chatDict.getPeople().map((name, index) => (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index, name);
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

        <ChatBox
          chatDict={chatDict}
          person={selectedPerson}
          publishHandler={publishHandler}
        />
      </Box>
    </>
  );
};

export default ChatWrapper;
