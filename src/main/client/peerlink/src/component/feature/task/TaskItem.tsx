import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditDialog from "./EditDialog";

interface Props {
  body: string;
  setBody: (body: string) => void;
  tasks: string[];
  editTasks: (text: string[]) => void;
  setIndex: () => void;
  setOpen: (open: boolean) => void;
}
const TaskItem = (props: Props) => {
  const handleClickEditOpen = () => {
    props.setBody(props.body);
    props.setIndex();
    props.setOpen(true);
  };

  return (
    <>
      <ListItem disablePadding>
        <Box display="flex" sx={{ flexDirection: "row", width: 1 }}>
          <ListItemText>{props.body}</ListItemText>
          <Box
            display="flex"
            sx={{ alignSelf: "flex-end", flexDirection: "row" }}
          >
            <ListItemButton onClick={handleClickEditOpen}>
              <EditIcon />
            </ListItemButton>
            <ListItemButton>
              <DeleteIcon />
            </ListItemButton>
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default TaskItem;
