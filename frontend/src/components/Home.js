import * as React from 'react';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {Row,Col} from 'reactstrap'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import ReadTab from './ReadTab';
import be from './../services/backendService'
import WriteTab from './writeTab';
import ReviewTab from './ReviewTab';
import MediaCard from './Card';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

   useEffect(() => {
     
  //  //fetch the read news
  //   const fetchNews= async ()=>{

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };
      
  //     console.log("inside fetch readtab",requestOptions);
  //     let result_status=be.read(requestOptions)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("result",res);
  //     })
  //     .catch((error) => console.log(error));
  //    };

  //   const fetchReviews= async ()=>{

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };
      
  //     console.log("inside fetch reviewtab",requestOptions);
  //     let result_status=be.read(requestOptions)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("result",res);
  //     })
  //     .catch((error) => console.log(error));
     
  //   };
   

    //  fetchNews();
    //  fetchReviews();
   
     
   }, [])
   
 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    //read news 0
     

    //review news 2
    console.log("newValue",newValue);

    setValue(newValue);
  };
  const [user,setUser]=useState(null);

  useEffect(() => {
     const usr=localStorage.getItem("user");
     const dict_usr=JSON.parse(usr);
     console.log("type of user",typeof dict_usr);
     console.log("user",usr);
     setUser(dict_usr)
      
  }, [])

  const styles = {
    userInfo: {
      margin:'15px',
      
    },
    listItem:{
      margin:'6px'
    }
    
  }
  

  return (
    
        <>
        
       {
       user && 
       <>
         
 
      
         <h2 className="text-center" style={{textAlign:'center'}}>Marketplace</h2>
        <Row style={styles.userInfo}>
        <Col md={4} style={styles.listItem}><b>User-Id:</b> {user.id}</Col>
        <Col md={4} style={styles.listItem}><b>Name:</b> {user.name}</Col>
        <Col md={4} style={styles.listItem}><b>Email:</b> {user.email}</Col>
        <Col md={4} style={styles.listItem}><b>Balance:</b> {user.balance}</Col>
        </Row>
     
         </>
         }
          
        
       
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="News Viewer" {...a11yProps(0)} />
          <Tab label="Post news" {...a11yProps(1)} />
          <Tab label="Review an article" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* <Box  sx={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between'
        }}
        >
      
       </Box> */}

       <ReadTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WriteTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReviewTab/>
      </TabPanel>
    </Box>
 
    </>
  );
}
