from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import HousingModel
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI()
model=HousingModel()
model.train()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class HouseFeatures(BaseModel):
    rooms: int
    distances: float
    bedroom: int
    bathroom: int
    car: float
    landsize: int
    propertycount:int
    age:int
    
@app.get("/")
async def root():
    return {"message":"Welcome to the backend model blablabla"}
@app.get("/predict/{price}")
async def predict_price_category(price:int):
    return {"price_category":model.categorize_price(price)}
@app.post("/predict")
async def predict_price(features:HouseFeatures):
    data=[{
    "Rooms": features.rooms,
    "Distance": features.distances,
    "Bedroom": features.bedroom,
    "Bathroom": features.bathroom,
    "Car": features.car,
    "Landsize": features.landsize,
    "Latitude": -37.8743,
    "Longtitude": 144.9656,
    "Propertycount": features.propertycount,
    "Age": features.age
    }]
    
    columns1=['Rooms', 'Distance' , 'Bedroom' , 'Bathroom',  'Car',  'Landsize',  'Latitude',  'Longtitude',  'Propertycount' ,   'Age']
    data=pd.DataFrame(data,columns=columns1)
    prediction = model.predict(data)
    print(data)

    return {"result":prediction[0]}
#Rooms  Distance  Bedroom  Bathroom  Car  Landsize  Latitude  Longtitude  Propertycount    Age
