import React, { useState, useEffect, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, CssBaseline, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserData from './auth/db.json';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Task() {
  const navigate = useNavigate()


  const [allTasks, setAllTasks] = useState(UserData.tasks)
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const [image_url, setImageURL] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
  const [cUser, setCUser] = useState({});
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
    console.log(user, 'kjlj')
    console.log(JSON.parse(user), 'dd');
  }, [])

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


  useEffect(() => {
    if (!localStorage.getItem('user_login') && JSON.parse(localStorage.getItem('user_login')).loggedIn !== true) {
      navigate('/login')
    }
  }, [])



  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      create_task: data.get('create_task')
    }

    if (actualData.create_task) {
      console.log(actualData.create_task, 'console.logconsole.log')

      // ++Object(UserData.tasks).length
      console.log(allTasks, 'before allTasks')
      // console.log([...allTasks].reverse()[0]["id"],'aaleeeeeelr')
      setAllTasks(allTasks => [...allTasks, {
        "id": ++allTasks.length,
        "name": actualData.create_task,
        "stage": 0,
        "created_by": UserData.currUser.email,
        "created_at": new Date().toISOString(),
        "deleted": 0

      }])

    } else {
      setError({ status: true, msg: "Please create your task.", type: 'error' })
      setTimeout(() => setError({
        status: false,
        msg: "",
        type: ""
      }), 2000)
    }
    console.log(UserData, 'before UserDataUserData')
  }
  console.log(UserData, 'after UserDataUserData')
  console.log(allTasks, 'after allTasks')

  useEffect(() => {

  }, [allTasks])

  const updateTask = (taskId, type) => {
    if (type == 'backward') {
      const taskIndex = allTasks.findIndex((obj => obj.id == taskId));
      if (allTasks[taskIndex].stage > 0) {
        setAllTasks(allTasks => [...allTasks, --allTasks[taskIndex].stage])
      }
    } else if (type == 'forward') {
      const taskIndex = allTasks.findIndex((obj => obj.id == taskId));
      if (allTasks[taskIndex].stage < 3) {
        setAllTasks(allTasks => [...allTasks, ++allTasks[taskIndex].stage])
      }
    } else {
      const taskIndex = allTasks.findIndex((obj => obj.id == taskId));
      setAllTasks(allTasks => [...allTasks, allTasks[taskIndex].deleted = 1])
    }
  }





  // var backlog = UserData.tasks.filter(item => item.stage === 0);
  // console.log(backlog, 'backlogbacklog')

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Grid container>
        <Grid item lg={2} md={2} sm={2} sx={{ backgroundColor: 'gray', p: 5 }} >

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
            
            // style={{border:2,boderColor:'white',borderWidth:'10',borderRadius:'10'}}
            src={image_url}
          />
          <h2 style={{textAlign:"center"}}>{cUser.username}</h2>
        </Grid>
        <Grid item sm={10} sx={{ backgroundColor: '#ccc', p: 5, color: 'white' }}>
          <h1>Task Management</h1>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Backlog" {...a11yProps(0)} />
                <Tab label="To Do" {...a11yProps(1)} />
                <Tab label="Ongoing" {...a11yProps(2)} />
                <Tab label="Done" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}  >
              <TextField margin='normal' required fullWidth id='create_task' name='create_task' label='Create Task' style={{ backgroundColor: '#fff' }} />
              {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
              <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }}>Create Task</Button>
              </Box>

            </Box>
            <TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell >Task Name</TableCell>
                      <TableCell align="center">Created By</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTasks.length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No Backlog Task Available"}
                        </TableCell>
                      </TableRow>

                    )}

                    {allTasks.length > 0 && allTasks.filter(item => item.stage === 0 && item.deleted === 0).length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No Backlog Task Available"}
                        </TableCell>
                      </TableRow>

                    )}
                    {allTasks.filter(item => item.stage === 0 && item.deleted === 0).map((row) => (
                      <TableRow
                        key={row.id + row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.created_by}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center" style={{ alignItem: 'center', justifyContent: 'spaceBetween' }}>
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'backward')} disabled>
                            <FaIcons.FaBackward />
                          </Button>
                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'forward')}>
                            <FaIcons.FaForward />
                          </Button>

                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'delete')}>
                            <AiIcons.AiFillDelete />
                          </Button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>


            <TabPanel value={value} index={1}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell >Task Name</TableCell>
                      <TableCell align="center">Created By</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTasks.length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No To Do Task Available"}
                        </TableCell>
                      </TableRow>

                    )}

                    {allTasks.length > 0 && allTasks.filter(item => item.stage === 1 && item.deleted === 0).length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No To Do Task Available"}
                        </TableCell>
                      </TableRow>

                    )}
                    {allTasks.filter(item => item.stage === 1 && item.deleted === 0).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.created_by}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center" style={{ alignItem: 'center', justifyContent: 'spaceBetween' }}>
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'backward')}  >
                            <FaIcons.FaBackward />
                          </Button>
                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'forward')}>
                            <FaIcons.FaForward />
                          </Button>

                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'delete')}>
                            <AiIcons.AiFillDelete />
                          </Button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell >Task Name</TableCell>
                      <TableCell align="center">Created By</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTasks.length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No OnGoing Task Available"}
                        </TableCell>
                      </TableRow>

                    )}

                    {allTasks.length > 0 && allTasks.filter(item => item.stage === 2 && item.deleted === 0).length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No OnGoing Task Available"}
                        </TableCell>
                      </TableRow>

                    )}
                    {allTasks.filter(item => item.stage === 2 && item.deleted === 0).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.created_by}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center" style={{ alignItem: 'center', justifyContent: 'spaceBetween' }}>
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'backward')}  >
                            <FaIcons.FaBackward />
                          </Button>
                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'forward')}>
                            <FaIcons.FaForward />
                          </Button>

                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'delete')}>
                            <AiIcons.AiFillDelete />
                          </Button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell >Task Name</TableCell>
                      <TableCell align="center">Created By</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTasks.length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No Done Task Available"}
                        </TableCell>
                      </TableRow>

                    )}

                    {allTasks.length > 0 && allTasks.filter(item => item.stage === 3 && item.deleted === 0).length == 0 && (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" colSpan={4}>
                          {"No Done Task Available"}
                        </TableCell>
                      </TableRow>

                    )}
                    {allTasks.filter(item => item.stage === 3 && item.deleted === 0).map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.created_by}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center" style={{ alignItem: 'center', justifyContent: 'spaceBetween' }}>
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'backward')}  >
                            <FaIcons.FaBackward />
                          </Button>
                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'forward')} disabled>
                            <FaIcons.FaForward />
                          </Button>

                          {"    "}
                          <Button type='submit' variant='contained' sx={{ mt: 6, mb: 2, px: 5 }} onClick={() => updateTask(row.id, 'delete')} >
                            <AiIcons.AiFillDelete />
                          </Button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>

        </Grid>

      </Grid>
    </>
  );
}
