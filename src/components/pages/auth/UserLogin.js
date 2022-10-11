import React, { useState , Suspense, lazy } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../../feature/userSlice';
import  UserData from './db.json';

const UserLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log('actualData befoe',actualData);


console.log(UserData,'before userdata')
    if (actualData.email && actualData.password) {
      const currentU = UserData.users && UserData.users.find(user => ((user?.email == actualData.email) && (user?.password == actualData.password)))
      console.log(currentU,'currentU')
      console.log('actualData',actualData);
       console.log(UserData,'UserData')
       if(currentU && Object.keys(currentU).length > 1){
            // UserData.currUser.user_id = currentU.user_id;         
            // UserData.currUser.user_name = currentU.username;
            // UserData.currUser.email = actualData.email;
            // UserData.currUser.loggedIn = actualData.loggedIn;
            UserData.currUser = currentU;
            // dispatch(login(actualData.push({loggedIn:true}))); 
            document.getElementById('login-form').reset()
            localStorage.setItem('user_login',JSON.stringify(UserData.currUser))
            console.log(UserData,'UserData after')
            setError({ status: true, msg: "Login Success", type: 'success' })
            setTimeout(() => navigate('/dashboard'),2000)
        } else {
          setError({ status: true, msg: "User doesn't exist", type: 'error' })
            setTimeout(() => navigate('/login'),2000)
        }
      
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
      </Box>
      {/* <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink> */}
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default UserLogin;
