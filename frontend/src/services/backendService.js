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



  //vote for an article by reviewer
  const vote = async (config) => {
    const relativeUrl = `api/v1/users/`;
  
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


  //read an article by a reader
  const read = async (config) => {
    const relativeUrl = `api/v1/users/`;
  
    const url = `${baseUrl}${relativeUrl}`;
  
    // return fetch(url, config)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(res);
    //     }
    //     return handleResponse(res);
    //   })
    //   .catch((e) => handleErrors(e));

    console.log("config recieved in the backend service",config);
    console.log('url to hit to the fetch',url);

    fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      console.log("data",data);
      return data;
    });


  };

  //publish an article by a publisher
  const publish = async (config) => {
    const relativeUrl = `api/v1/users/`;
  
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
    read
  }