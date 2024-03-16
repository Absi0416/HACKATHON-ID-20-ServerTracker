
import {  useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { userActions } from '../../actions/UserActions';
import React, { useState } from 'react';
import backgroundImage from '../../assets/images/nc05.png';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function RegistrationPage() {
  localStorage.getItem("userId")
const [user, setUser] = useState({ username: '' });
const [email, setEmail] = useState({ email: '' });
const [credential, setPassword] = useState({ password: '' });
const [project, setProject] = useState({ project: '' });
const navigate = useNavigate();
const registerUser = async () => {

  if (user.username  && email.email && credential.password) {
    var register_response = await userActions.register(user.username,email.email, credential.password, project.project);
    if(register_response.statusCode == 200){
      toast.success("User Registered successfully", {
        position: "top-center"
      });
      navigate('/dashboard/default', { state: { reg: "Dashboard" } });
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

const routeChange = () => {
  navigate('/login', { state: { reg: "Login" } });
};

  return (
  <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
  <div id="main-registration-container">
  <ToastContainer/>
      <div id="register">     
      <Form id="login" className="login-form" >
      <div className="Welcome">
        <h5>
           <span className="font-weight-bold" style={{ color: '#00274C' }}>💻 Join the NC Server Tracker Community! 💻</span>
        </h5>
        <h2></h2>
      </div>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Name</Label>
        <Input type="text" name="userName" value={user.username} placeholder="Enter User Name" className="textfield"
          onChange={e => setUser({ username: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Email</Label>
        <Input type="email" name="email" value={email.email} placeholder="Enter Email ID" className="textfield"
          onChange={e => setEmail({ email: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Password</Label>
        <Input type="password" name="password" value={credential.password} placeholder="Enter Your Password" className="textfield"
          onChange={e => setPassword({ password: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Project</Label>
        <Input type="text" name="project" value={project.project} placeholder="Enter Project Name" className="textfield"
          onChange={e => setProject({ project: e.target.value })} />
      </FormGroup>
      <Button
        variant="contained"
        onClick={registerUser}
        style={{ backgroundColor: '#007681', color: '#FFFFFF' }}
        className="btn btn-lg btn-dark btn-block button ">Register</Button>
   
   <Button onClick={routeChange} className="btn btn-lg btn-dark btn-block " style={{ backgroundColor: '#007681', color: '#FFFFFF' }}>Back</Button>
         </Form>
      </div>
    
  </div>
  </div>

  );
};

