import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import scService from '../services/scService';
import be from '../services/backendService';
import { toast } from "react-toastify";


export default function ButtonAppBar() {
 let navigate=useNavigate();

  const handleRegister=()=>
  {
    console.log("inside handleRegister");
    navigate("/register", { replace: true });
  }

  const handleSignIn= async ()=>{
    if (window.ethereum) {
      var myHeaders = new Headers();
      const accounts = await scService.getAccount();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("public_addr", accounts);
      // let val={
      //   "public_addr":accounts
      // }
      // console.log("val",val)
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        // body: JSON.stringify(val),
        redirect: "follow",
        
      };

      try {
        let register_status = be.signIn(requestOptions)
          .then((response) => {
            console.log("response from be",response);
            if (response==="error" ) {
              console.log("inside response error");
              toast.error("User Not Registered");
              throw new Error("User Not Found");
            } else {
              return response.json();
            }
          })
          .then((res) => {
            console.log("result of be",res);
            
            const dat = {
              id: res.user_id,
              name: res.name,  
              email: res.email,
              balance:res.balance
            };

           console.log("data",dat);
              localStorage.setItem("user", JSON.stringify(dat));
              localStorage.setItem("isLogged", "true");
              localStorage.setItem("publicAddress", accounts);
              navigate("/homepage", { replace: true });
            
          })
          .catch((error) => {
            console.log("inside navbar error");
            console.log("Error", error);
          });
      } catch (error) {}
    } else {
      // setModalShow(true);
    }




  }

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    // setUser(null);
    // setIsLogged(false);
  };



  const gotoHome=() =>{
    navigate("/", { replace: true });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleOpenNavMenu}
            color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color='inherit' onClick={gotoHome}>
            DECOIN
          </Button>
          </Typography>
          {localStorage.getItem("isLogged")=="true"?
          <>
          <Button color="inherit" onClick={logout}>Logout</Button> 
          </>: 
            <>
          <Button color="inherit" onClick={handleSignIn}>Login</Button>
          <Button color="inherit" onClick={handleRegister}>Register</Button>
          </>
           }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
