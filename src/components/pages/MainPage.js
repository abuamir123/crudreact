import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { Home } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import "./MainPage.css"
import { useHistory, useNavigate, useParams } from "react-router-dom";


const MainPage = (props)=> {
    const {modal,setModal}=props;
    const [patients,setPatients]=useState({
        name:"",
        email:""
    })
    const navigate=useNavigate()
    function handleClick(){
        setModal(false)

    }
    const [status,setStatus]=useState();

    function onTextFieldChange(e){
        
        setPatients({
            ...patients,
            
            [e.target.name]:e.target.value
        })
   
    }

   async function onFormSubmit(e){
    e.preventDefault()
    try {
     await axios.post(`http://localhost:8081/patient/save`, patients)
     setStatus(true);
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
   if(status){
       return <Home/>
   }
  

    
    return ( 
    <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
    <div>  <Box textAlign="center" className="" p={2} mb={2}>
    <Typography variant="h2">React CRUD </Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className="" mb={2}>
      <Typography variant="h4">Add Patient</Typography>
     </Box>
     <form noValidate>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" label="Name" onChange={e=>onTextFieldChange(e)}></TextField>
        
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e=>onTextFieldChange(e)}/>
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
           <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>

    <Grid item md={6} xs={12}>
    
    </Grid>
   </Grid>
   
   </div>
   </div>
    </div> );
}

export default MainPage;