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
     
      body: JSON.stringify({ name: username, email: email, pass: password, project: project  , status:1})
    };
    return fetch(apiConstants.END_POINT + apiConstants.REGISTER, registeruser)
      .then(response => {
        console.log("response");
        console.log(response);
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(user => {      
        return user;
      });
    }
