import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import LineChart from '../components/linechart';
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
  const checkData = () => {
    return (
      rooms !== 0 &&
      distances !== 0 &&
      bedroom !== 0 &&
      bathroom !== 0 &&
      car !== 0 &&
      landsize !== 0 &&
      propertycount !== 0 &&
      age !== 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedprice(0);
    const payload = {
      rooms,
      distances,
      bedroom,
      bathroom,
      car,
      landsize,
      propertycount,
      age,
    };

    try {
      // Axios call to the backend to predict house price
      const response = await axios.post(`http://localhost:8000/predict`, payload);
      const newPredictedPrice = response.data.result;
      setPredictedprice(newPredictedPrice);
      const response2 = await axios.get(`http://localhost:8000/predict/${newPredictedPrice}`)
      setPredictedCategory(response2.data.price_category)
      const squareFootages = [];
      let start = 5.12;
      const end = 30.41;
      const increment = 2.18;
      let predictions = []
      for (let i = start; i <= end; i += increment) {
        squareFootages.push(i);
      }
      predictions = await Promise.all(
        squareFootages.map(async sf => {
            let payloadchart ={
                rooms,
                distances:sf,
                bedroom,
                bathroom,
                car,
                landsize,
                propertycount,
                age,
              }
          const res = await axios.post(`http://localhost:8000/predict`, payloadchart);
          return res.data.result;
            }
        )
      );
      setChartData({ squareFootages, predictions , predictedprice:newPredictedPrice, distances})
      // const newChartData = {
      //   labels: squareFootages, // X-axis labels (square footage)
      //   datasets: [
      //     {
      //       label: 'Predicted Prices',
      //       data: predictions,  // Y-axis data (predicted prices)
      //       borderColor: 'rgb(75, 192, 192)',
      //       backgroundColor: 'rgba(75, 192, 192, 0.5)',
      //       tension: 0.1
      //     },
      //     {
      //       label: 'Your Prediction',
      //       data: [{x: parseInt(age), y: response.data.result}],
      //       borderColor: 'rgb(255, 99, 132)',
      //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //       pointRadius: 8,
      //       pointHoverRadius: 12,
      //       showLine: false // Show only the point for the user's prediction
      //     }
      //   ]
      // }
      // console.log(predictions);
      // setChartData(newChartData);
    } catch (err) {
      console.error(err);
      console.log(predictedprice);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
  const inputPropsStyle = {
   '& label.MuiInputLabel-root': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiOutlinedInput-input':{
    color:'white'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2', // Border color on focus
                      },
                    }
};
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4}}>
          <Typography variant="h3" component="h1" gutterBottom>
            House Price Predictor
          </Typography>
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rooms"
                required
                type="number"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Distances to CBD"
                required
                type="number"
                id="distances"
                value={distances}
                onChange={(e) => setDistances(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bedrooms"
                required
                id="bedroom"
                value={bedroom}
                onChange={(e) => setBedroom(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bathrooms"
                required
                id="bathroom"
                value={bathroom}
                onChange={(e) => setBathroom(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Car"
                required
                id="car"
                value={car}
                onChange={(e) => setCar(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Landsize"
                required
                id="landsize"
                value={landsize}
                onChange={(e) => setLandsize(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Property Count"
                required
                id="propertycount"
                value={propertycount}
                onChange={(e) => setPropertycount(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                required
                id="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                fullWidth
                sx={inputPropsStyle}
              />
            </Grid>
            <Grid item size={{xs:12}}>
              <Button 
              sx={{
                backgroundColor:'#043873',
                color:'white',
                '&:hover':{
                    backgroundColor: 'white',
                    color: '#043873'
                }
               }}
                type="submit"
                variant="contained"
                color="primary"
                
              >
                Predict Price
              </Button>
            </Grid>
          </Grid>
          {predictedprice !== 0 ? (
            <Paper elevation={3} sx={{ p: 3, mt: 2 , bgcolor:'primary.main'}}>
              <Typography variant="h5" gutterBottom>
                Predicted Price: ${predictedprice.toLocaleString()}
              </Typography>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ mt: 2 ,bgcolor:'primary.main'}}>
              <Typography variant="h5" gutterBottom>
                No price available or error
              </Typography>
            </Paper>
          )}
           {category !== "" ? (
            <Paper elevation={3} sx={{ p: 3, mt: 2 ,bgcolor:'primary.main'}}>
              <Typography variant="h5" gutterBottom>
                Predicted Price: ${category.toLocaleString()}
              </Typography>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ mt: 2,bgcolor:'primary.main' }}>
              <Typography variant="h5" gutterBottom>
                No category available or error
              </Typography>
            </Paper>
          )}
          {(chartData && (predictedprice!=0)) &&(
                <Box sx={{ mt: 3 }}>
                  {/* <Line 
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Price Predictions by Distance to CBD'
                        }
                      },
                      scales: {
                        x: {
                          type: 'linear',
                          position: 'bottom',
                          title: {
                            display: true,
                            text: 'Distance to CBD ( kms)'
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Predicted Price ($)'
                          }
                        }
                      }
                    }}
                  /> */}
                  <LineChart data={chartData} />
                </Box>
              )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Predict;
