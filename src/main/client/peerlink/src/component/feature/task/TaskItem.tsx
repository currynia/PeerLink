import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface Props {
  body: string;
  setBody: (body: string) => void;
  tasks: string[];
  editTasks: (text: string[]) => void;
  setIndex: () => void;
  setOpen: (open: boolean) => void;
  setTitle: (title: string) => void;
  setDeleteOpen: (open: boolean) => void;
}
const TaskItem = (props: Props) => {
  const handleClickEditOpen = () => {
    props.setBody(props.body);
    props.setIndex();
    props.setOpen(true);
    props.setTitle("Edit");
  };

  const handleClickDelete = () => {
    props.setIndex();
    props.setDeleteOpen(true);
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
            <ListItemButton onClick={handleClickDelete}>
              <DeleteIcon />
            </ListItemButton>
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default TaskItem;
