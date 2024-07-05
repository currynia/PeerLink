import React from 'react';
import { Box, Typography, Paper, ListItem, ListItemText, ListItemButton } from '@mui/material';
import {StudySession} from "../../../api/ApiAccess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';

interface StudySessionItemProps {
    location:string;
    setTitle:(ti: string) => void;
    setLocation: (location: string) => void;
    date: string;
    setDate: (location: string) => void;
    setIndex: () => void;
    setOpen: (open: boolean) => void;
    setDeleteOpen: (open: boolean) => void;
    editListing: (newlist: Array<StudySession>) => void;
}

const StudySessionItem = (props: StudySessionItemProps) => {
    const handleClickEditOpen = () => {
      props.setLocation(props.location);
      props.setDate(props.date);
      props.setIndex();
      props.setOpen(true);
      props.setTitle("Edit");
    };
  
    const handleClickDelete = () => {
      props.setIndex();
      props.setDeleteOpen(true);
    };

    return (
        <ListItem disablePadding>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width={1}
          >
            <Box flexGrow={1}>
              <ListItemText>{props.location}</ListItemText>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <ListItemText>{props.date}</ListItemText>
              <ListItemButton onClick={handleClickEditOpen}>
                <EditIcon />
              </ListItemButton>
              <ListItemButton onClick={handleClickDelete}>
                <DeleteIcon />
              </ListItemButton>
            </Box>
          </Box>
        </ListItem>
      );
    // return (
    //     <>
    //       <ListItem disablePadding>
    //         <Box display="flex" sx={{ flexDirection: "row", width: 1, alignItems:'center' }}>
    //           <ListItemText>{props.location}</ListItemText>
    //           <ListItemText>{props.date}</ListItemText>
    //           <Box
    //             display="flex"
    //             sx={{ alignSelf: "flex-end", flexDirection: "row" }}
    //           >
    //             <ListItemButton onClick={handleClickEditOpen}>
    //               <EditIcon />
    //             </ListItemButton>
    //             <ListItemButton onClick={handleClickDelete}>
    //               <DeleteIcon />
    //             </ListItemButton>
    //           </Box>
    //         </Box>
    //       </ListItem>
    //     </>
    //   );
}

export default StudySessionItem;
