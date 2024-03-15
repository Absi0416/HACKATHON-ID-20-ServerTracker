import React, { useEffect } from 'react';
import { userConstants } from '../constants/userConstants';
import { userService } from '../services/user.service';
import { alertConstants } from '../constants/alterConstats';
import { alertService } from './AlterActions';
import axios from 'axios';

type Props = {};
export const userActions = {
    login,
    register
  };

async function login(username: any, password: any) {
    console.log(username);
    var responseData = await userService.login(username,password);
    if(responseData.statusCode == 200){
      console.log(responseData.response.userId);
      localStorage.setItem('userId', JSON.stringify(responseData.response.userId));
      localStorage.setItem('userName', JSON.stringify(responseData.response.userName));
      return responseData
    }
    else {
      return responseData.statusCode;
    }
  };
  

  async function register(username: any, password: any) {
    console.log(username);
    var responseData = await userService.login(username,password);
    if(responseData.statusCode === 200){
   
      return responseData
    }
    else {
      return responseData.statusCode;
    }
  };


