import { useEffect, useState } from "react";
import { ApiAccess } from "../../api/ApiAccess";
import { List, ListItem, ListItemText } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([""]);
  useEffect(() => {
    (async () => {
      console.log(JSON.parse(sessionStorage.getItem("user") as string));
      const response = await ApiAccess.retrieveTasks(
        JSON.parse(sessionStorage.getItem("user") as string).username
      );

      setTasks(response);
    })();
  }, []);
  return (
    <List>
      {tasks?.map((text, index) => (
        <ListItem>
          <ListItemText>{text}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
