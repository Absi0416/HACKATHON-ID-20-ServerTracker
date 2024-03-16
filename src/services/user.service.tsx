import { apiConstants } from "../constants/apiConstants";
export const userService = {
    login,
    register
  };
  


function login(username: any, password: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    const requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ username, password })
    };
  
    return fetch(apiConstants.Dummy_end_point + apiConstants.LOGIN, requestOptions)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(user => {      
        return user;
      });
  }

  
  function register(username: any,email:any, password: any,project:any) {
    const registeruser = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
     
      body: JSON.stringify({ username,email, password,project })
    };
    console.log("11111111111111111111111");
   console.log(registeruser);
   console.log("11111111111111111111111");
    return fetch(apiConstants.END_POINT + apiConstants.REGISTER, registeruser)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(user => {      
        console.log("00000000000000000000");
   console.log(user);
   console.log("00000000000000000");
        return user;
      });
    }
