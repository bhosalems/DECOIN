import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import scService from '../services/scService';
import be from '../services/backendService';
import {toast} from 'react-toastify';

export default function MediaCard({dat}) {
    console.log("data",dat);

    const handleApprove=(e)=>{
        console.log("value",e.target.value);
       
     let public_addr=localStorage.getItem('publicAddress')
     console.log("public address",public_addr);
     var myHeaders = new Headers();
     let user=localStorage.getItem("user");
     let parseUser=JSON.parse(user)
     console.log("id",parseUser.id);
     let data={
        "user_id":parseUser.id,
        "status":e.target.value,
        "news_id":dat.id
     }
     myHeaders.append("Content-Type", "application/json");
     var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(data),
      redirect: "follow",
      };
    
    // console.log("inside fetch readtab",requestOptions);
    // let result_status=be.vote(requestOptions)
    // .then((res) => res.json())
    // .then((res) => {
    //   console.log("result",res);
    // })
    // .catch((error) => console.log(error));


    const register_status =  scService
    .vote(public_addr)
    .then(() =>
          be.vote(requestOptions)
    );
  
    toast.promise(register_status, {
    pending: "Processing",
    success: "Registered Successfully",
    error: "Registration Failed",
  });
console.log("sc completed");
        
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"
          sx={{
            textAlign:'center'
          }}>
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {dat.data}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{color:'green'}} 
        id="for"
        name="1"
        value="1"
        onClick={handleApprove}>
            Approve
        </Button>
        <Button size="small"
           name="2"
           id="against"
           value="2"
            sx={{ color:'red'}}
            onClick={handleApprove}
            >Revoke</Button>
      </CardActions>
    </Card>
  );
}
