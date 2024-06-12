import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";
import ChatDict from "./ChatDict";

interface Props {
  open: boolean;
  setOpen: (_: boolean) => void;
  setChatDict: (chatDict: ChatDict) => void;
  chatDict: ChatDict;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddDialog = (props: Props) => {
  const [name, setName] = useState("");
  return (
    <BootstrapDialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle>Add friend</DialogTitle>
      <DialogContentText>Enter the username to add</DialogContentText>
      <TextField
        autoFocus
        required
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            props.setChatDict(props.chatDict.addKey(name));
            props.setOpen(false);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddDialog;
