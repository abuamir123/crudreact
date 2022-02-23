import { Typography, Box, Fab,makeStyles, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import List from "../patients/List"
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import MainPage from "./MainPage"
function Home () {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
    return ( <div>
          <Box sx={{ '& > :not(style)': { m: 2 } }}>
        <Tooltip title="MainPage">
        <Fab color="secondary" aria-label="add">
        <IconButton onClick={toggleModal} className="btn-modal">
        <AddIcon /></IconButton>
      </Fab>
      </Tooltip>
      </Box>
        <List/>
        {modal && (<MainPage/>
        
      /* <Box m={3} textAlign="center">
           <Button variant="contained" color="primary" onClick={toggleModal}>Back to Home</Button>
          </Box>
      </div> */
)}
       
    </div> )
}

export default Home;

