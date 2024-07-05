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
import DateTimePicker from "react-datetime-picker";
import { TextField } from "@mui/material";
import { ApiAccess, StudySession } from "../../../api/ApiAccess";
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
  title:string;
  location: string;
  date: string;
  open: boolean;
  setOpen: (b: boolean) => void;
  session: StudySession[];
  setSession: (session: StudySession[]) => void;
  setLoc: (loc: string) => void;
  setDate: (sessions: string) => void;
  index: number;
}
const EditDialog = (props: Props) => {
  const [newDate, setNewDate] = useState("");
  const [newLoc, setNewLoc] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleAdd = async () => {
    const newSession = {date:newDate, location:newLoc, user:UserDetails.getUsername()} 
    const newSession1:StudySession = await ApiAccess.addSessions(newSession);
    const newSession2 = props.session.concat(newSession1);
    props.setSession(newSession2);
    props.setOpen(false);
  };


  const handleSave = () => {
    const newSessionList = props.session.map((sess, index) => {
      if (index === props.index) {
        sess.location = newLoc;
        sess.date = newDate;
        return sess;
      } else {
        return sess;
      }
    });
    props.setSession(newSessionList);
    ApiAccess.updateSession(props.session[props.index]);
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
          id="date-input"
          label="Date"
          type ="date"
          fullWidth
          variant="outlined"
          defaultValue={newDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewDate(e.target.value)
          }
        /> 
         <TextField
          id="outlined-basic"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={newLoc}
          onChange={(e:ChangeEvent<HTMLInputElement>) => 
            setNewLoc(e.target.value)
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
