import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ApiAccess } from "../../../api/ApiAccess";
import UserDetails from "../../../UserDetails";

interface Props {
  open: boolean;
  setDeleteOpen: (b: boolean) => void;
  tasks: string[];
  setTasks: (tasks: string[]) => void;
  index: number;
}
const DeleteDialog = (props: Props) => {
  const handleDelete = () => {
    const newTasks =
      props.tasks.length == 1
        ? []
        : props.tasks.filter((_, i) => i !== props.index);
    props.setTasks(newTasks);
    ApiAccess.saveTasks({
      username: UserDetails.getUsername(),
      tasks: newTasks,
    });
    props.setDeleteOpen(false);
  };
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setDeleteOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setDeleteOpen(false)}>No</Button>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
  