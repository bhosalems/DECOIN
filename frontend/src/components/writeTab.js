import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import be from '../services/backendService';
import { toast } from "react-toastify";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import scService from '../services/scService';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

 const WriteTab=() => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    const account = await scService.getAccount();

    const data = new FormData(event.currentTarget);


    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("publicAddress", account);


    console.log({
      email: data.get('title'),
      password: data.get('article'),
    });

    
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      const register_status =  scService
        .publish(account, data.get('Deposit'))
        .then(() =>
              be.addUser(requestOptions)
        );
      
        toast.promise(register_status, {
        pending: "Processing",
        success: "Registered Successfully",
        error: "Registration Failed",
      });
   console.log("sc completed");





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
    
          <Typography component="h1" variant="h5">
            Write Your Article Down
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
            />
           <TextField
              margin="normal"
              required
              fullWidth
              id="article"
              multiline={true}
              rows={6}
              label="article"
              name="article"
              autoComplete="article"
              autoFocus
              style={{height:100}}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop:10, mb: 2 }}
            >
              Publish
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default WriteTab;