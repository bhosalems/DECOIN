import React from 'react'
import  ReadTab  from './ReadTab'
import { Box } from '@mui/system';

const readList = ({data}) => {
    console.log("nesasdf",data)
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
                <ReadTab key={dat.id} 
                           dat={dat}/>
                   )
                        
      }
     </Box>
  )
}

export default readList