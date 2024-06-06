import { useEffect, useState } from "react";
import { ApiAccess } from "../../../api/ApiAccess";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TaskItem from "./TaskItem";
import AddIcon from "@mui/icons-material/Add";
import EditDialog from "./EditDialog";
import UserDetails from "../../../UserDetails";

const TaskList = () => {
  const [tasks, setTasks] = useState([""]);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    (async () => {
      console.log(JSON.parse(sessionStorage.getItem("user") as string));
      const response = await ApiAccess.retrieveTasks(UserDetails.getUsername());

      setTasks(response);
    })();
  }, []);
  const modifyTasks = (t: string[]) => setTasks(t);
  return (
    <>
      <List disablePadding sx={{ width: 1 }}>
        {tasks?.map((body, index) => (
          <>
            <ListItem sx={{ paddingLeft: 5, paddingRight: 5 }}>
              <TaskItem
                body={body}
                setBody={setBody}
                tasks={tasks}
                editTasks={modifyTasks}
                setIndex={() => setIndex(index)}
                setOpen={setOpen}
              />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
        <ListItem disablePadding sx={{ paddingLeft: 5 }}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add a new item" />
          </ListItemButton>
        </ListItem>
      </List>
      <EditDialog
        title="Edit"
        body={body}
        open={open}
        setOpen={setOpen}
        setTasks={setTasks}
        tasks={tasks}
        index={index}
      />
    </>
  );
};

export default TaskList;
