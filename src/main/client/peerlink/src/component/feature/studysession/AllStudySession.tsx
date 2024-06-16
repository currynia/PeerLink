import { useEffect, useState } from "react";
import { ApiAccess, StudySession } from "../../../api/ApiAccess";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

const AllStudySession = () => {
  const [session, setSession] = useState<StudySession[]>([]);
  useEffect(() => {
    (async () => {
      const response = await ApiAccess.retrieveSessions();
      setSession(response);
    })();
  }, []);
  return (
    <List disablePadding sx={{ width: 1 }}>
      <div>
        <Link to="/app/my-sessions">
          <Button>Go to my sessions</Button>
        </Link>
      </div>
      {session.map((item, index) => (
          <>
            <ListItem key={index} sx={{ paddingLeft: 5, paddingRight: 5 }}>
              <ListItemText
                primary = {`Date: ${item.date}`}
                secondary = {`Location: ${item.location} - User: ${item.user}`}
            />        
            </ListItem>
            <Divider component="li" />
          </>
        ))}
    </List>
  );
};

export default AllStudySession;
