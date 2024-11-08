import React, { useState , useRef} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2'; 
import LineChart from '../components/linechart';
import BoxPlot from '../components/boxplot';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Predict() {
  const [rooms, setRooms] = useState(0);
  const [distances, setDistances] = useState(0);
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [car, setCar] = useState(0);
  const [landsize, setLandsize] = useState(0);
  const [propertycount, setPropertycount] = useState(0);
  const [age, setAge] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [predictedprice, setPredictedprice] = useState(0);
  const [category, setPredictedCategory] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedprice(0);
    const payload = { rooms, distances, bedroom, bathroom, car, landsize, propertycount, age };

    try {
      const response = await axios.post(`http://localhost:8000/predict`, payload);
      const newPredictedPrice = response.data.result;
      setPredictedprice(newPredictedPrice);
      
      const response2 = await axios.get(`http://localhost:8000/predict/${newPredictedPrice}`)
      setPredictedCategory(response2.data.price_category)

      // Generate data for chart
      const squareFootages = Array.from({length: 12}, (_, i) => 5.12 + i * 2.18);
      const predictions = await Promise.all(squareFootages.map(async (sf) => {
          let payloadchart = { rooms, distances:sf, bedroom, bathroom, car, landsize, propertycount, age };
          const res = await axios.post(`http://localhost:8000/predict`, payloadchart);
          return res.data.result;
      }));

      setChartData({ squareFootages, predictions, predictedprice: newPredictedPrice, distances });
    } catch (err) {
      console.error(err);
    }
  };

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  });

  const inputPropsStyle = {
    '& label.MuiInputLabel-root': { color: 'gray' },
    '& label.Mui-focused': { color: '#1976d2' },
    '& .MuiOutlinedInput-input': { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: '#1976d2' },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4, p: 3}}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
            House Price Predictor
          </Typography>
          <Typography variant="body1" gutterBottom align="center" sx={{   mb: 3 }}>
            Enter the details below to get an estimate of your house's value based on various parameters.
          </Typography>

          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                How many rooms does the property have?
              </Typography>
              <TextField
                label="Rooms"
                required
                type="number"
                onChange={(e) => setRooms(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Distance to CBD (in km)
              </Typography>
              <TextField
                label="Distances to CBD"
                required
                type="number"
                onChange={(e) => setDistances(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                How many bedrooms?
              </Typography>
              <TextField
                label="Bedrooms"
                required
                type="number"
                onChange={(e) => setBedroom(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Number of bathrooms
              </Typography>
              <TextField
                label="Bathrooms"
                required
                type="number"
                onChange={(e) => setBathroom(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Car spaces available
              </Typography>
              <TextField
                label="Car"
                required
                type="number"
                onChange={(e) => setCar(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Total land size (in m²)
              </Typography>
              <TextField
                label="Landsize"
                required
                type="number"
                onChange={(e) => setLandsize(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Number of properties nearby
              </Typography>
              <TextField
                label="Property Count"
                required
                type="number"
                onChange={(e) => setPropertycount(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{   mb: 1 }}>
                Age of the property (in years)
              </Typography>
              <TextField
                label="Age"
                required
                type="number"
                onChange={(e) => setAge(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                sx={{
                  backgroundColor: '#043873',
                  color: 'white',
                  '&:hover': { backgroundColor: 'white', color: '#043873' },
                }}
                type="submit"
                variant="contained"
              >
                Predict Price
              </Button>
            </Grid>
          </Grid>

          {predictedprice !== 0 && (
            <Paper elevation={3} sx={{ p: 3, mt: 2, bgcolor: 'primary.main' }}>
              <Typography variant="h5" gutterBottom>
                Predicted Price: ${predictedprice.toLocaleString()}
              </Typography>
            </Paper>
          )}
          {category && (
            <Paper elevation={3} sx={{ p: 3, mt: 2, bgcolor: 'primary.main' }}>
              <Typography variant="h5" gutterBottom>
                Predicted Price Category: {category}
              </Typography>
            </Paper>
          )}
          {chartData && predictedprice !== 0 && (
            <Box sx={{ mt: 3 }}>
              <LineChart data={chartData}/>
              <BoxPlot data={chartData}/>
            </Box>
          )}
        
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Predict;
