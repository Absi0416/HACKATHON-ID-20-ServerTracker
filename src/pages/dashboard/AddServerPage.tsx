import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { serverActions } from '../../actions/ServerActions';
import { ServerModel } from "../../helpers/ServerModel";
type Props = {};

const AddServerPage = (props: Props) => {
  var userId = localStorage.getItem("userId");

  
  const [serverIP, setServerIP] = useState({ IP: '' });
   const [userName, setuserName] = useState({ userName: '' });
  const [credentialDB, setcredentialDB] = useState({ credentialDB: '' });
  const [DBServerPort, setDBServerPort] = useState({ DBServerPort: '' });
  const [AppServerPort, setAppServerPort] = useState({ AppServerPort: '' });
  const navigate = useNavigate();
  const registerUser = async () => {
  
    if ( serverIP.IP && credentialDB.credentialDB) {
      //this.setState({ submitted: true });           
      const serverDetails = { 
        serverIp: serverIP.IP,
        dbUserPassword: credentialDB.credentialDB, 
        dbUserName: userName.userName, 
        dbServerPort : DBServerPort.DBServerPort,
        appServerPort : AppServerPort.AppServerPort,
        user:{ id : 1}

      
      };
      console.log(serverDetails);


      var response = await serverActions.addServer(serverDetails);
      if(response.statusCode == 200){
        alert('Server Registered successfully');
        navigate('/dashboard/manageserver', { state: { reg: "manageserver" } });
      }
      else{
        alert('Server Error');
      }
    } else {
      alert('Please fill all the details');
    }
  
  };
  
  
    return (

    <div id="main-registration-container">  
        <div id="register">     
        <Form id="login" className="login-form" >
        <div className="Welcome">
          <h5>
            <span className="font-weight-bold">Server Registration Page</span>
          </h5>
        </div>
        <FormGroup>
          <Label>Server IP</Label>
          <Input type="text" name="serverIP" value={serverIP.IP} placeholder="IP" className="textfield"
            onChange={e => setServerIP({ IP: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>User Name</Label>
          <Input type="text" name="userName" value={userName.userName} placeholder="DB User Name" className="textfield"
            onChange={e => setuserName({ userName: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="text" name="DBPassword" value={credentialDB.credentialDB} placeholder="DB server password" className="textfield"
            onChange={e => setcredentialDB({ credentialDB: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Port</Label>
          <Input type="text" name="DBServerPort" value={DBServerPort.DBServerPort} placeholder="DB Server Port" className="textfield"
            onChange={e => setDBServerPort({ DBServerPort: e.target.value })} />
        </FormGroup>
               <FormGroup>
          <Label>Port</Label>
          <Input type="text" name="AppServerPort" value={AppServerPort.AppServerPort} placeholder="App Server Port" className="textfield"
            onChange={e => setAppServerPort({ AppServerPort: e.target.value })} />
        </FormGroup>

        <Button
          variant="contained"
          onClick={registerUser}
          className="btn btn-lg btn-dark btn-block " style={{ backgroundColor: '#007681', color: '#FFFFFF' }}>Register Server</Button>
      </Form>
        </div>
    </div>
    );
  };
  

export default AddServerPage;