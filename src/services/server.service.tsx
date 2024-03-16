import { json } from "stream/consumers";
import { apiConstants } from "../constants/apiConstants";
import { ServerModel } from "../helpers/ServerModel";
export const serverService = {
    addServer,
    getServers,
    getManageServer,
    bulkUploadServer
  };
  

  function addServer(IP:any ,credentialDB:any,userName:any,DBServerPort:any,AppServerPort: any,userId:any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
      body:  JSON.stringify({ serverIp: IP,
      dbUserPassword: credentialDB, 
      dbUserName: userName, 
      dbServerPort : DBServerPort,
      appServerPort : AppServerPort,
      user:{ id :userId}})
    };
    return fetch(apiConstants.END_POINT + apiConstants.ADD_SERVER, requestOptions)
      .then(response => {
        if (!response.ok) {
            console.log(response);  
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(user => {    
        return user;
      });
  }

  function getManageServer(userId: any) {
    console.log("getting all server Details")
  
    return fetch(apiConstants.END_POINT + apiConstants.GET_USER_SERVER + userId)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(allServers => {    
        return allServers;
      });
  }

  function getServers(userId: any) {
    console.log("getting all server Details")
  
    return fetch(apiConstants.END_POINT + apiConstants.GET_ALL_SERVERS + userId)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }  
        return response.json();
      })
      .then(allServers => {    
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