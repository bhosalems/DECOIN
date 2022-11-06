import React, { useEffect, useRef, useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {  withRouter, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import scService from '../services/scService';
import be from '../services/backendService';
import { toast } from "react-toastify";




const theme = createTheme();

export default function SignUp() {

  const emptyuser = {
    firstName: "",
    lastName: "",
    publicAddress: "",
    email: "",
    deposit: 0.0,
  };
  const [user, setuser] = useState(null);

  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("event.currentTarget",data);
    setuser(event.currentTarget);
    console.log("rev")
    console.log({
      email: data.get('email'),
      deposit: data.get('Deposit'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    });
   
    emptyuser.firstName=data.get('firstName');
    emptyuser.lastName=data.get('lastName');
    emptyuser.email=data.get('email');
    emptyuser.deposit=data.get('Deposit');
    setuser(emptyuser);
    console.log('empty user',emptyuser);

    event.preventDefault();
    var myHeaders = new Headers();

    if (window.ethereum) {
      console.log("metamask enabled",window.ethereum);
    } else {
      console.log("metamask not enabled");
    }

    // if (validDeposit == "has-success") {
      const account = await scService.getAccount();
    
      console.log("account address", account);
      // const account = accounts[0];
      // setWalletAddress(account);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("publicAddress", account);
      // myHeaders.append("Access-Control-Allow-Origin", "*");
      // myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("amaount",data.get('Deposit'));
      var formData ={
        ...data,
        public_addr:account
      } 

     let val= JSON.stringify(
        {
        name: data.get('firstName') + data.get('lastName'),
        public_addr: account,
        email: data.get('email'),
        balance: data.get('Deposit')
      }
      );
      console.log("value passed in the body",val);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(val),
        redirect: "follow",
      };
    console.log("user:",user);
      const register_status =  scService
        .register(account, data.get('Deposit'))
        .then(() =>
              be.addUser(requestOptions)
        );
      
        toast.promise(register_status, {
        pending: "Processing",
        success: "Registered Successfully",
        error: "Registration Failed",
      });
   console.log("sc completed");

     
      // navigate("/", { replace: true });
    // } else {
    //   toast.error("Not a Valid Deposit");
    

    //send request to sc
    
      

    //send request to be

    console.log(typeof data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Deposit"
                  label="Deposit"
                  type="Number"
                  id="deposit"
                  autoComplete="deposit-amount"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I am not a robot."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}