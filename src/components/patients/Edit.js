
import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../pages/MainPage.css"
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});
function Edit() {
    const classes=useStyles()
    const navigate=useNavigate()
    function handleClick(){
        navigate("/")
    }
    const {id}=useParams();
    const [patient,setpatient]=useState({
      name:"",
      email:""
    });

    useEffect(()=>{ 
      getPatient();
    }, [id]);
    
      async function getPatient() {
      try{
        const patient=await axios.get(`http://localhost:8081/patient/patient/${id}`)
        setpatient(patient.data);
      }
      catch(error)
      {
        console.log("something is wrong in edit")
      }
    }

    function onTextFieldChange(e){
      setpatient({
        ...patient,
        [e.target.name]:e.target.value
      })
    }
    async function onFormSubmit(e){
     e.preventDefault();
     try{
          await axios.put(`http://localhost:8081/patient/update/${id}`,patient)
          navigate("/")

     }
     catch(error)
     {
       console.log("something is wrong in edit")
     }

     
   }
   

      // const {title,children,openPopup,setopenPopup}=props
    
    return (   
     <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
        <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
         <Typography variant="h2">React CRUD with API Call</Typography>
        </Box>
     
        <Grid container justify="center" spacing={4}>
         <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
           <Typography variant="h4">Edit Patient</Typography>
          </Box>
          <form>
           <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
             <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
             <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="pname" label="Name" value={patient.name} onChange={e=>onTextFieldChange(e)}  />
            </Grid>
            <Grid item xs={12}>
             <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={patient.email}  onChange={e=>onTextFieldChange(e)} />
            </Grid>
           </Grid>
           <Box m={3}>
            <Button type="button" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}> Update </Button>
           </Box>
          </form>
          <Box m={3} textAlign="center">
           <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
          </Box>
         </Grid>
        </Grid >
        </div>
   </div>
    
        );
}

export default Edit;