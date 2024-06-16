import { useEffect, useState } from "react";
import { ApiAccess, StudySession } from "../../../api/ApiAccess";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SessionItem from "./SessionItem";
import AddIcon from "@mui/icons-material/Add";
import EditSession from "./EditSession";
import UserDetails from "../../../UserDetails";
import DeleteSession from "./DeleteSession";
import { Link } from "react-router-dom";

const MySession = () => {
  const [title, setTitle] = useState("");
  const [session, setSessions] = useState<StudySession[]>([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await ApiAccess.retrieveUserSessions({username:UserDetails.getUsername()});

      setSessions(response);
    })();
  }, []);
  // const modifyLoc = (l: string) => setLocation(l);
  // const modifyDate = (d: string) => setDate(d);
  const modifyListing = (s: StudySession[]) => setSessions(s);
  return (
    <>
      <List disablePadding sx={{ width: 1 }}>
      <div>
        <Link to="/app/all-sessions">
          <Button>Go to all sessions</Button>
        </Link>
      </div>
        {session?.map((item, index) => (
          <>
            <ListItem sx={{ paddingLeft: 5, paddingRight: 5 }}>
              <SessionItem
                location={item.location}
                setLocation={setLocation}
                date = {item.date}
                setDate={setDate}
                editListing ={modifyListing}
                setIndex={() => setIndex(index)}
                setTitle={setTitle}
                setOpen={setOpen}
                setDeleteOpen={setDeleteOpen}
              />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
         <ListItem disablePadding sx={{ paddingLeft: 5 }}>
          <ListItemButton
            onClick={() => {
              setOpen(true);
              setTitle("Add");
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add a new session" />
          </ListItemButton>
        </ListItem>
      </List>
      <EditSession
        title= {title}
        location={location}
        date={date}
        open={open}
        setOpen={setOpen}
        setDate={setDate}
        setLoc={setLocation}
        setSession= {setSessions}
        session={session}
        index={index}
      />
      <DeleteSession
        open={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        setSession={setSessions}
        sessions={session}
        index={index}
      />
    </>
  );
};

export default MySession;