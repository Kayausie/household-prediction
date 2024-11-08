import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#043873',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function About() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>
          <Paper elevation={3} sx={{ p: 3 , backgroundColor:'primary.main'}} className='aboutCard'>
            <Typography variant="h6" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              Our mission is to provide accurate and insightful predictions for housing prices based on various factors including property features, location, and market trends.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1">
              - User-friendly interface for inputting property details.
            </Typography>
            <Typography variant="body1" paragraph>
              - Accurate predictions powered by advanced algorithms.
            </Typography>
            <Typography variant="body1" >
              - Real-time data updates to ensure current market relevance.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" >
              If you have any questions or feedback, feel free to reach out to us at house.ai@support.com
            </Typography>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default About;
