import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
  } from "@mui/material";
  import { ApiAccess, StudySession} from "../../../api/ApiAccess";
  
  interface Props {
    open: boolean;
    setDeleteOpen: (b: boolean) => void;
    sessions: StudySession[]; //task changed to sess 
    setSession: (sessions: StudySession[]) => void;
    index: number;
  }

  const DeleteSession: React.FC<Props> = (props) => {
    const handleDelete = async () => {
      try {
        const sessionToDelete = props.sessions[props.index];
        await ApiAccess.deleteStudySession(sessionToDelete); // Call the API to delete the session
        const newSessions = props.sessions.filter((_, i) => i !== props.index); // Filter out the deleted session
        props.setSession(newSessions); // Update the state with the new sessions array
        props.setDeleteOpen(false); // Close the dialog
      } catch (error) {
        console.error("Failed to delete session:", error);
      }
    };
//   const DeleteDialog = (props: Props) => {
//     const handleDelete = () => {
//     //   const newTasks =
//     //     props.sessions.length == 1
//     //       ? []
//     //       : props.sessions.filter((_, i) => i !== props.index);
//     //   props.setSession(newTasks);
//     //   ApiAccess.saveSession({
//     //     username: UserDetails.getUsername(),
//     //     tasks: newTasks,
//     //   });
//       ApiAccess.deleteStudySession(props.sessions[index].id)
//       props.setDeleteOpen(false);
//     };
    return (
      <Dialog
        open={props.open}
        onClose={() => props.setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this Session?
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
  
  export default DeleteSession;