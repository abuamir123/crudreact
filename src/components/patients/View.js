
import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Domain } from "@material-ui/icons";
const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});
function View() {
    const{id}=useParams();
    const [patients,setpatients]=useState([])

    useEffect(()=>
    {
       getPatient()
    },[id])
    async function getPatient(){
        try{
            const patients=await axios.get(`http://localhost:8081/patient/patient/${id}`)
            setpatients(patients.data)

        }
        catch(error){
            console.log("some thing is wrong")

        }
    }
    
   
    const classes = useStyles();
    const navigate = useNavigate();
    const handleClick=()=>{
       navigate("/")
    }
    return (  <>
         <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">Patient Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell align="center">{patients.id}</TableCell>
       <TableCell align="center">{patients.name}</TableCell>
       <TableCell align="center">{patients.email}</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
  </>
    );
}

export default View;