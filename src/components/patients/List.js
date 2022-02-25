import { Typography, Box, Fab,makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import View from "./View"

import AddIcon from '@material-ui/icons/Add';
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import Edit from "@material-ui/icons/Edit";
const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },
    addStuColor: {
        backgroundColor: green[400],
        color: "white"
    },
})
function List() {
    const [modal,setModal]=useState(false)
    const [patients, setPatient] = useState([])
    const toggleModal = () => {
        setModal(!modal);
      };
    useEffect(() => {
        getAllPatient()
    })
    const handleDelete= async id =>
    {
        console.log("delete click ")
        console.log(id)
     await axios.delete(`http://localhost:8081/patient/delete/${id}`);
     
    }

    async function getAllPatient() {
        try {
            const patients = await axios.get("http://localhost:8081/patient/load")
            // console.log(patients.data)
            setPatient(patients.data)
        }
        catch (error) {
            console.log("something is wrong")
        }
    }
    const classes = useStyles();
    return (<div container>
      
        <Box textAlign="center" p={3} className={classes.stuListColor}>
            <Typography variant="h4">Patients List</Typography>
        </Box>
        <TableContainer component={Paper}>
            <Table style={{ width: 1700,margin:40 }}>
                <TableHead>
                    <TableRow style={{ backgroundColor: "#616161" }}>
                        <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                        <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                        <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                        <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        patients.map((patient, i)=>
                    {
                            return(
                    <TableRow key={i}>
                        <TableCell align="center">{i+1}</TableCell>
                        <TableCell align="center">{patient.name}</TableCell>
                        <TableCell align="center">{patient.email}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="View">
                                <IconButton><Link to={`/View/${patient.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton><Link to={`/Edit/${patient.id}`} onClick={toggleModal}><EditIcon /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={()=>handleDelete(patient.id)}><DeleteIcon color="secondary" /></IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    )
})
}
                </TableBody>
            </Table>
        </TableContainer>
        
        {modal && (<Edit />)}
    </div>);

}


export default List;