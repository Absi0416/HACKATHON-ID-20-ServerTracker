import { apiConstants } from "../constants/apiConstants";
import { ServerModel } from "../helpers/ServerModel";
export const serverService = {
    addServer,
    getServers,
    bulkUploadServer
  };
  

  function addServer(registerServer: any) {
    console.log(registerServer);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ serverUserName : registerServer.serverUserName, serverPassword: registerServer.serverPassword,serverIp:registerServer.serverIp})
    };
    console.log("Request");
 console.log(requestOptions.body);
 console.log("Request");
    return fetch(apiConstants.END_POINT + apiConstants.ADD_SERVER, requestOptions)
      .then(response => {
        if (!response.ok) {
            console.log(response);  
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(user => {    
        console.log("server add response");  
        console.log(user);  
        return user;
      });
  }

  function getServers() {
    console.log("getting all server Details")
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
      mode:'cors',
      body: JSON.stringify({})
    };
   
    return fetch(apiConstants.END_POINT + apiConstants.GET_ALL_SERVERS)
      .then(response => {
        if (!response.ok) {
            console.log(response);  
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(allServers => {    
        console.log("server Success response");  
        console.log(allServers);  
        return allServers;
      });
  }

  function bulkUploadServer(file:any) {
    console.log("Upload all server Details")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode:'cors',
      body: JSON.stringify({'file':file})
    };
   
    return fetch(apiConstants.END_POINT + apiConstants.GET_ALL_SERVERS)
      .then(response => {
        if (!response.ok) {
            console.log(response);  
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(allServers => {    
        console.log("server Success response");  
        console.log(allServers);  
        return allServers;
      });
  }