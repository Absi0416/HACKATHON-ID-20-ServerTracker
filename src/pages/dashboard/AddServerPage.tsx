import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { serverActions } from '../../actions/ServerActions';
import { ServerModel } from "../../helpers/ServerModel";
type Props = {};

const AddServerPage = (props: Props) => {


  const [serverName, setServerName] = useState({ serverName: '' });
  const [serverIP, setServerIP] = useState({ IP: '' });
  const [credential, setPassword] = useState({ password: '' });
  const navigate = useNavigate();
  const registerUser = async () => {
  
    if (serverName.serverName  && serverIP.IP && credential.password) {
      //this.setState({ submitted: true });           
      const serverDetails = { 
        serverUserName: serverName.serverName,
        serverPassword: credential.password, 
        serverIp: serverIP.IP };
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
          <Input type="text" name="userName" value={serverIP.IP} placeholder="User Name" className="textfield"
            onChange={e => setServerIP({ IP: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="text" name="DBPassword" value={credential.password} placeholder="DB server password" className="textfield"
            onChange={e => setPassword({ password: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Port</Label>
          <Input type="text" name="DBServerPort" value={credential.password} placeholder="DB Server Port" className="textfield"
            onChange={e => setPassword({ password: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>User Name</Label>
          <Input type="text" name="AppUserName" value={serverIP.IP} placeholder="App User Name" className="textfield"
            onChange={e => setServerIP({ IP: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="text" name="AppUserPassword" value={credential.password} placeholder="App server password" className="textfield"
            onChange={e => setPassword({ password: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Port</Label>
          <Input type="text" name="AppServerPort" value={credential.password} placeholder="App Server Port" className="textfield"
            onChange={e => setPassword({ password: e.target.value })} />
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