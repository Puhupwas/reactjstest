import React, { useState, Suspense, lazy } from 'react';
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserData from './db.json';

const Registration = () => {
  console.log(UserData, 'hiii')
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [image_url,setImageURL] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, 'ee in file')
    const data = new FormData(e.currentTarget);
    const actualData = {
      user_id:(UserData.users.length == 0 ) ? 1 : ++UserData.users.length,
      username: data.get('username'),
      email: data.get('email'),
      contact_number: data.get('contact_number'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      profile_image: data.get('profile_image'),
      tc: data.get('tc'),
    }

    console.log(actualData.profile_image, 'actualData')
   
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          console.log(reader.result,' sdsddssddss')
          actualData.photo_url = reader.result;
          if(reader.result && reader.result != "" && reader.result != "data:"){
          setImageURL(reader.result)
          } else {
            setImageURL("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
          }
        })
        reader.readAsDataURL(actualData.profile_image);
 

    console.log(actualData,'actualDataactualData')

  

    if (actualData.username && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        document.getElementById('registration-form').reset()
        UserData.users.push(actualData);
        // UserData.currUser.push(...UserData.currUser,{
        //   email:actualData.email,
        //   loggedIn:true
        // })
        setError({ status: true, msg: "Registration Successful", type: 'success' })
        setTimeout(() => navigate('/login'), 2000)
        console.log(UserData, 'bye')
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "These Fields are Required", type: 'error' })
    }
  }

  
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit} type="method" encType="multipart/form-data" >
      <TextField margin='normal' required fullWidth id='username' name='username' label='Username' />
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' fullWidth id='contact_number' name='contact_number' label='Contact Number' type="number" pattern="[0-9]+" minlength="10" />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      <Box
        component="img"
        sx={{
          height: 150,
          width: 150,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        id="profile_url"
        alt="Profile pic"
        src={image_url}
      />
      <TextField margin='normal' fullWidth id='profile_image' name='profile_image' type='file' />

      <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }}>Join</Button>
      </Box>
    </Box>
  </>;
};

export default Registration;
