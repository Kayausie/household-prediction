import React from 'react';
import logo from '../assets/houseimage.png';
import '../App.css'
import{Box, AppBar, Toolbar, Button, Typography, Container} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
function NavBar(){
    return(
        <Box>
            <AppBar position="sticky">
                <Toolbar sx={{ bgcolor: 'black' , borderBottom: '1px solid grey' }}>
                    <Container>
                        <Grid container>
                        {/* Left section with logo and title */}
                            <Grid item size={{xs:6, sm:5}} alignItems="center" justifyContent="flex-start">
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                <Box
                                    component="img"
                                    src={logo}
                                    alt="Logo"
                                    sx={{ height: 40, width: 'auto', marginRight: 2 }}
                                />
                                <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                                    HOUSE.AI
                                </Typography>
                                <Button color="inherit" className='dmSansButton' sx={{fontWeight:'550', textTransform:'none'}} component={Link} to='/'>Home</Button>
                                <Button color="inherit" className='dmSansButton'sx={{fontWeight:'550', textTransform:'none'}}component={Link} to='/about'>About</Button>
                                <Button color="inherit" className='dmSansButton'sx={{fontWeight:'550', textTransform:'none'}}component={Link} to='/predict'>Predict</Button>
                                </Box>
                            </Grid>

                            {/* Middle section with buttons */}
                            <Grid item size={{xs:6, sm:4}} container spacing={4} justifyContent='center'>
                                
                            </Grid>

                            {/* Right section with additional buttons */}
                            <Grid item size={{xs:6, sm:3}} container spacing={2} justifyContent='center' >
                                <Button color="inherit"  variant="outlined" className='loginButton'
                               >Login</Button>
                                <Button variant='contained'
                               sx={{
                                backgroundColor:'#043873',
                                color:'white',
                                '&:hover':{
                                    backgroundColor: 'white',
                                    color: '#043873'
                                }
                               }}>Sign up</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;