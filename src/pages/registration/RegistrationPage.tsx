
import {  useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { userActions } from '../../actions/UserActions';
import React, { useState } from 'react';
import backgroundImage from '../../assets/images/nc05.png';



export default function RegistrationPage() {
  localStorage.getItem("userId")
const [user, setUser] = useState({ username: '' });
const [email, setEmail] = useState({ email: '' });
const [credential, setPassword] = useState({ password: '' });
const navigate = useNavigate();
const registerUser = async () => {

  if (user.username  && email.email && credential.password) {
    //this.setState({ submitted: true });           
    const newRecord = { asdfads: email.email, password: credential.password };
    console.log(newRecord);
    var login_response = await userActions.register(email.email, credential.password);
    if(login_response.statusCode == 200){
      alert('User Registered successfully');
      navigate('/dashboard/default', { state: { reg: "Dashboard" } });
    }
    else{
      alert('Server Error');
    }
  } else {
    alert('Please fill all the details');
  }

};


  return (
  <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
  <div id="main-registration-container">

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
        <Input type="email" name="userName" value={user.username} placeholder="enter user Name" className="textfield"
          onChange={e => setUser({ username: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Email</Label>
        <Input type="email" name="email" value={email.email} placeholder="enter user Name" className="textfield"
          onChange={e => setEmail({ email: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Password</Label>
        <Input type="password" name="password" value={credential.password} placeholder="password" className="textfield"
          onChange={e => setPassword({ password: e.target.value })} />
      </FormGroup>
      <FormGroup>
      <Label style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>Project</Label>
        <Input type="text" name="project" value={user.username} placeholder="Enter Project Name" className="textfield"
          onChange={e => setPassword({ password: e.target.value })} />
      </FormGroup>
      <Button
        variant="contained"
        onClick={registerUser}
        style={{ backgroundColor: '#007681', color: '#FFFFFF' }}
        className="btn btn-lg btn-dark btn-block button ">Register</Button>
     
    </Form>
      </div>
  </div>
  </div>
  );
};

