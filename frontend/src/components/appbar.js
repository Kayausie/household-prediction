import React from 'react';
import logo from '../assets/houseimage.png';
import '../App.css';
import { Box, AppBar, Toolbar, Button, Typography, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ bgcolor: 'black', borderBottom: '1px solid grey' }}>
          <Container>
            <Grid container alignItems="center">
              {/* Left section with logo and title */}
              <Grid item size={{xs:6, sm: 8,lg:5}} container alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to='/'>
                  <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ height: 40, width: 'auto', marginRight: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    HOUSE.AI
                  </Typography>
                </Box>
                <Box spacing={2} display={{xs:'none', sm: 'flex' }}>
                <Button color="inherit" className='dmSansButton' sx={{ fontWeight: '550', textTransform: 'none' }} component={Link} to='/'>Home</Button>
                <Button color="inherit" className='dmSansButton' sx={{ fontWeight: '550', textTransform: 'none' }} component={Link} to='/about'>About</Button>
                <Button color="inherit" className='dmSansButton' sx={{ fontWeight: '550', textTransform: 'none' }} component={Link} to='/predict'>Predict</Button>
              </Box>
              </Grid>

              {/* Center section with navigation links, shown only on medium and larger screens */}
             

              {/* Right section with Login and Sign Up buttons */}
              <Grid item size={{xs:6, sm:4, lg:7}} container justifyContent="flex-end">
                <Grid container display={{ xs: 'none', sm: 'flex' }} spacing={2} alignItems="center">
                    <Grid item>
                    <Button color="inherit" variant="outlined" className="loginButton">
                        Login
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button
                        variant="contained"
                        sx={{
                        backgroundColor: '#043873',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: '#043873',
                        },
                        }}
                    >
                        Sign up
                    </Button>
                    </Grid>
                </Grid>

                {/* Mobile menu icon */}
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Container>

          {/* Drawer for mobile navigation */}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
              <List>
                <ListItem button component={Link} to='/'>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to='/about'>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} to='/predict'>
                  <ListItemText primary="Predict" />
                </ListItem>
                <ListItem button>
                  <Button color="inherit" variant="outlined" fullWidth>Login</Button>
                </ListItem>
                <ListItem button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#043873',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#043873'
                      }
                    }}
                  >
                    Sign up
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
