import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import View from "./View"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
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
    const [patients, setPatient] = useState([])
    useEffect(() => {
        getAllPatient()
    })

    async function getAllPatient() {
        try {
            const patients = await axios.get("http://localhost:8888/patients")
            // console.log(patients.data)
            setPatient(patients.data)
        }
        catch (error) {
            console.log("something is wrong")
        }
    }
    const classes = useStyles();
    return (<div>
        <Box textAlign="center" p={2} className={classes.stuListColor}>
            <Typography variant="h4">Patients List</Typography>
        </Box>
        <TableContainer component={Paper}>
            <Table>
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
                        <TableCell align="center">{patient.pname}</TableCell>
                        <TableCell align="center">{patient.email}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="View">
                                <IconButton><Link to={`/View/${patient.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton><Link to={"/Edit"}><EditIcon /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton ><DeleteIcon color="secondary" /></IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    )
})
}
                </TableBody>
            </Table>
        </TableContainer>
    </div>);

}

export default List;