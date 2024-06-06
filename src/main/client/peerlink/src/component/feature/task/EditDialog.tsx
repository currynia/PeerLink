import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import { ApiAccess } from "../../../api/ApiAccess";
import UserDetails from "../../../UserDetails";

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
        <Typography gutterBottom>{props.body}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditDialog;
