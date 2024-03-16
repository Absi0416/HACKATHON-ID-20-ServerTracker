import React, { useEffect } from 'react';
import { serverConstants } from '../constants/userConstants';
import { serverService } from '../services/server.service';
import { alertConstants } from '../constants/alterConstats';
import { alertService } from './AlterActions';
import { ServerModel } from "../helpers/ServerModel";

type Props = {};
export const serverActions = {
    addServer,
    getServers,
    getManageServer,
    bulkUploadServer
  };

  async function addServer(IP:any ,credentialDB:any,userName:any,DBServerPort:any,AppServerPort: any,userId:any ) {
    var responseData = await serverService.addServer(IP,credentialDB,userName,DBServerPort,AppServerPort,userId);
    if(responseData.statusCode === 200){
      return responseData
    }
    else {
      return responseData.statusCode;
    }
  };

  async function getServers(userId: any) {
    var responseData = await serverService.getServers(userId);
    if(responseData.statusCode === 200){
      return responseData
    }
    else {
      return responseData;
    }
  };

  async function getManageServer(userId: any) {
    var responseData = await serverService.getManageServer(userId);
    if(responseData.statusCode === 200){
      return responseData
    }
    else {
      return responseData;
    }
  };

  async function bulkUploadServer(file: any) {
    var responseData = await serverService.bulkUploadServer(file);
    if(responseData.statusCode === 200){
   
      return responseData
    }
    else {
      return responseData.statusCode;
    }
  };
