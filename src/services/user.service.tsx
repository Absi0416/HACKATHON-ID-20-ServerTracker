import { apiConstants } from "../constants/apiConstants";
export const userService = {
    login 
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
  
    return fetch(apiConstants.Dummy_end_point + apiConstants.LOGIN, requestOptions1)
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