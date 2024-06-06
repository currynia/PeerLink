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
import DeleteDialog from "./DeleteDialog";

const TaskList = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([""]);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    (async () => {
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
                setTitle={setTitle}
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
            <ListItemText primary="Add a new item" />
          </ListItemButton>
        </ListItem>
      </List>
      <EditDialog
        title={title}
        body={body}
        open={open}
        setOpen={setOpen}
        setTasks={setTasks}
        tasks={tasks}
        index={index}
      />
      <DeleteDialog
        open={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        setTasks={setTasks}
        tasks={tasks}
        index={index}
      />
    </>
  );
};

export default TaskList;
