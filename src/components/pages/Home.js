import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import axios from "axios";
import { useState } from "react";
import List from "../patients/List"
const Home = ()=> {
    const [patients,setPatients]=useState({
        pname:"",
        email:""
    })

    function onTextFieldChange(e){
        setPatients({
            ...patients,
            [e.target.name]:e.target.value
        })
        
    }

   async function onFormSubmit(e){
    e.preventDefault()
    try {
     await axios.post(`http://localhost:8888/patients`, patients)
    //  setStatus(true);
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
  

    
    return ( <div container>  <Box textAlign="center" className="" p={2} mb={2}>
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
        <TextField autoComplete="pname" name="pname" variant="outlined" required fullWidth id="pname" label="Name" onChange={e=>onTextFieldChange(e)}></TextField>
        
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e=>onTextFieldChange(e)}/>
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
    </Grid>

    <Grid item md={6} xs={12}>
     <List/>
    </Grid>
   </Grid>
        
    </div> );
}

export default Home;