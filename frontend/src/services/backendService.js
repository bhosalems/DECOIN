import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_API_URL;


//register user to backend
const addUser = async (config) => {
    const relativeUrl = `/api/v1/register/`;
  
    const url = `${baseUrl}${relativeUrl}`;
    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);
   
   fetch(url, config)
  .then((response) => response.json())
  .then((data) => {
    console.log("data",data);
    return data;
  });


  };


  //sign in the user
  const signIn = async (config) => {
    const relativeUrl = `/api/v1/login/`;
     
    const url = `${baseUrl}${relativeUrl}`;
   console.log("url",url);
 
   console.log("config",config);

  //  const res=await fetch(url, config);
  //  console.log("result",res.text());
  //  if(res=="error"){
  //   return "error"
  //  }
  //  else
  //  {
  //   return res
  //  }

  return fetch(url, config)
      .then((res) => {
        console.log("response",res);
        if (!res.ok) {
          throw new Error(res);
        }
        return res;
      })
      .catch((e) => {
        return "error";
      });
   
    // .then((response) => 
    //   {
    //     if(response=="error")
    //     {
    //       throw new Error(response);
    //     }
    //     return response.json();
    //   }).then((data) => {
    //   console.log("data",data);
    // })
    //  .catch((e) => {
    //   console.log("in catch");
    //     return "error";
    //   });

 
  }

  //vote for an article by reviewer
  const review = async (config) => {
    const relativeUrl = `/api/v1/fetchreview/`;
  
    const url = `${baseUrl}${relativeUrl}`;
  
    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);
   
  const res=await fetch(url, config)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("data",data);
    //   return data;
    // });
    console.log("response",res);
    return res;

  };

  const vote = async (config) => {
    const relativeUrl = `/api/v1/vote/`;
  
    const url = `${baseUrl}${relativeUrl}`;
  
    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);

    let res=await fetch(url, config)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("data",data);
      return res;
    // });

  };


  //read an article by a reader
  const read = async (config) => {
    const relativeUrl = `/api/v1/newsfeed/`;
  
    const url = `${baseUrl}${relativeUrl}`;
  
    

    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);

    // fetch(url, config)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("data",data);
    //   return data;
    // });

    const res=await fetch(url, config)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("data",data);
    //   return data;
    // });
    console.log("response",res);
    return res;


  };

  //publish an article by a publisher
  const publish = async (config) => {
    const relativeUrl = `/api/v1/publish/`;
  
    const url = `${baseUrl}${relativeUrl}`;
  
    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);

    fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      console.log("data",data);
      return data;
    });
  };


/*
==========HANDLE ERROR==============================
*/
  function handleErrors(e) {
    console.log("inside handle errors", JSON.parse(e));
  }


  /*
==========HANDLE ERROR==============================
*/
  
  function handleResponse(response) {
    console.log(response);
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      console.log("inside response");
      if (!response.ok) {
        if ([401, 403].includes(response.status)) {
        }
  
        const error = (data && data.message) || response.statusText;
  
        return Promise.reject(error);
      }
  
      return data;
    });
  }

  export default {
    addUser,
    vote,
    publish,
    read,
    review,
    signIn
  }