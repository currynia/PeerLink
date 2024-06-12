import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import UserDetails from "../../../UserDetails";
import { ApiAccess } from "../../../api/ApiAccess";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  title: string;
  body: string;
  open: boolean;
  setOpen: (b: boolean) => void;
  tasks: string[];
  setTasks: (tasks: string[]) => void;
  index: number;
}
const EditDialog = (props: Props) => {
  const [newBody, setNewBody] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleAdd = () => {
    const newTasks = props.tasks.concat(newBody);
    props.setTasks(newTasks);
    ApiAccess.saveTasks({
      username: UserDetails.getUsername(),
      tasks: newTasks,
    });
    props.setOpen(false);
  };

  const handleSave = () => {
    const newTasks = props.tasks.map((body, index) => {
      if (index === props.index) {
        return newBody;
      } else {
        return body;
      }
    });
    props.setTasks(newTasks);
    ApiAccess.saveTasks({
      username: UserDetails.getUsername(),
      tasks: newTasks,
    });
    props.setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {props.title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue={props.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewBody(e.target.value)
          }
        />
      </DialogContent>
      <DialogActions>
        {props.title === "Edit" && (
          <Button autoFocus onClick={handleSave}>
            Save changes
          </Button>
        )}{" "}
        {props.title === "Add" && (
          <Button autoFocus onClick={handleAdd}>
            Add
          </Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditDialog;
