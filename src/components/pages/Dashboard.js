import React , { useState,useEffect, Suspense, lazy } from 'react';
import { Button, CssBaseline, Grid, Typography, Box, Card, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import UserData from './auth/db.json';
import { Cookie } from '@mui/icons-material';




const Dashboard = () => {
  const navigate = useNavigate()

  const [image_url,setImageURL] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
 const [cUser,setCUser] = useState({});
  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem('user_login')),'JSON.parse(localStorage.getItem("user_login"))')
    // if(!localStorage.getItem('user_login') && JSON.parse(localStorage.getItem('user_login')) == null ){
    //   navigate('/login')    
    // }
    var user = localStorage.getItem('user_login');
    setCUser(JSON.parse(user));
    var I = JSON.parse(user).photo_url;
    if(I != '' && I != 'data:'){
      setImageURL(I);
    } else {
      setImageURL("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    }
    console.log(user,'kjlj')
    console.log(JSON.parse(user),'dd');
  }, [])

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return <>
    <CssBaseline />
    <Navbar />
    <Grid container >
      <Grid item lg={2} md={2} sm={2}  sx={{ backgroundColor: 'gray', p: 5 }} >
    
      <Box
        component="img"
        sx={{
          height: 300,
          width: 180,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          borderRadius: '50%'
        }}
        id="profile_url"
        alt="The house from the offer."
        src={image_url}
      />
      <h2 style={{textAlign:"center"}}>{cUser.username}</h2>
      </Grid>
      <Grid item sm={10} sx={{ backgroundColor: '#ccc', p: 5, color: 'white', height:'100%' }}>
        <h1>Dashboard</h1>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} >
            <Card sx={{ minWidth: 275,backgroundColor:'#32a852' }}>
              <CardContent>

                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                  Total Tasks
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                </Typography>
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  <br />
                  <h5 style={{ fontSize: 25 }}>{UserData.tasks.filter(item => item.deleted == 0).length}</h5>
                </Typography>
              </CardContent>
              <CardActions>
                
              </CardActions>
            </Card>
          </Grid>


          <Grid item lg={4} md={4} sm={4} >
            <Card sx={{ minWidth: 275,marginHorizontal:20,backgroundColor:'#1d35ab' }}>
              <CardContent>

                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                  Total Completed Task
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                </Typography>
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  <br />
                  <h5 style={{ fontSize: 25 }}>{Object(UserData.tasks.filter(item => item.stage == 3 && item.deleted == 0)).length}</h5>
                </Typography>
              </CardContent>
              <CardActions>
                
              </CardActions>
            </Card>
          </Grid>


          <Grid item lg={4} md={4} sm={4} >
            <Card sx={{ minWidth: 275,backgroundColor:'#cf1b5d' }}>
              <CardContent>

                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                Total Pending Task
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                </Typography>
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  <br />
                  
                  <h5 style={{ fontSize: 25 }}>{Object(UserData.tasks.filter(item => ( item.stage == 1 || item.stage == 2 ) && item.deleted == 0)).length}</h5>
                </Typography>
              </CardContent>
              <CardActions>
                
              </CardActions>
            </Card>
          </Grid>

        </Grid>
      </Grid>

    </Grid>
  </>;
};

export default Dashboard;
