import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { serverActions } from '../../actions/ServerActions';
import { ServerModel } from "../../helpers/ServerModel";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
      var response = await serverActions.addServer(serverIP.IP,credentialDB.credentialDB,userName.userName,DBServerPort.DBServerPort,AppServerPort.AppServerPort,userId);
      if(response.statusCode == 200){
        toast.success("Server Registered successfully", {
          position: "top-center"
        });
        navigate('/dashboard/manageserver', { state: { reg: "manageserver" } });
      }
      else{
        toast.error("Server Error.Please contact admin", {
          position: "top-center"
        });
      }
    } else {
      toast.error("Please fill all the details", {
        position: "top-center"
      });
    }
  
  };
  
  
    return (

    <div id="main-registration-container">  
        <div id="register">     
          <ToastContainer/>
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
          <Label>DB User Name</Label>
          <Input type="text" name="userName" value={userName.userName} placeholder="DB User Name" className="textfield"
            onChange={e => setuserName({ userName: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>DB server password</Label>
          <Input type="text" name="DBPassword" value={credentialDB.credentialDB} placeholder="DB server password" className="textfield"
            onChange={e => setcredentialDB({ credentialDB: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>DB Port</Label>
          <Input type="text" name="DBServerPort" value={DBServerPort.DBServerPort} placeholder="DB Server Port" className="textfield"
            onChange={e => setDBServerPort({ DBServerPort: e.target.value })} />
        </FormGroup>
               <FormGroup>
          <Label>APP Port</Label>
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