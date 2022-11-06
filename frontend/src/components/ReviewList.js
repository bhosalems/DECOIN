import React from 'react'
import ReviewTab from './ReviewTab';
import MediaCard from './Card';
import { Box } from '@mui/system';
const ReviewList = ({data}) => {
    console.log("data in reviewlist",data);
  return (
      <Box sx={
         {
            display:'flex',
            flexDirection:'row',
            justifyContent: 'space-evenly',
            flexWrap:'wrap',
         }    
      }   >
      {data.map((dat)=> 
                 <MediaCard key={dat.id} 
                            dat={dat}/>
                    )
                         
       }
      </Box>
  )
}

export default ReviewList