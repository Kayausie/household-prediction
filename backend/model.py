import pandas as pd
import numpy as np #remove maybe
import matplotlib.pyplot as plt
from pydantic import BaseModel
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
import joblib

from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from datetime import datetime

class HousingModel:
    def __init__(self):
        self.model_path = './housing_model.joblib'
        self.price_quantiles = None  # To store the quantile thresholds
        try:
            # Load the model if already trained
            self.model = joblib.load(self.model_path)
        except FileNotFoundError:
            # Initialize the model if not trained yet
            self.model = DecisionTreeRegressor()
    def train(self):
        path = './data/Melbourne_housing.csv'
        melb_data = pd.read_csv(path)

        # data cleaning - drop rows with missing values, duplicates and/or incorrect values
        melb_data.dropna(inplace=True)
        current_year = datetime.now().year
        melb_data=melb_data.select_dtypes(exclude=[object])

        self.price_quantiles = melb_data['Price'].quantile([0.25, 0.5, 0.75])
        # Create a new column 'age' by subtracting 'yearbuilt' from the current year
        melb_data['Age'] = current_year - melb_data['YearBuilt']


        Q1 = melb_data['Price'].quantile(0.25)
        Q3 = melb_data['Price'].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        print(upper_bound)
        print(lower_bound)

        outliers = melb_data[(melb_data['Price'] < lower_bound) | (melb_data['Price'] > upper_bound)]
        for price in outliers['Price'].tolist():
            melb_data = melb_data[melb_data['Price'] != price]


        X=melb_data.drop(['Price'],axis=1).drop(['YearBuilt'],axis=1).drop(['Postcode'],axis=1)

        y=melb_data['Price']

        X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

        train_data=X_train.join(y_train)

        train_data=train_data.select_dtypes(exclude=[object])

        # train_data['Landsize']=np.log(train_data['Landsize']+1)
        # train_data['Age']=np.log(train_data['Age']+1)
        train_data['BedroomRatio']=train_data['Bedroom']/ train_data['Rooms']
        print(X_train)
        # num_cols = ['Bedroom', 'Price', 'Distance', 'Landsize']

        # test = train_data[num_cols]
        # plt.figure(figsize=(10, 16))
        # corr_matrix = test.corr()
        # sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
        # plt.show()


        X_train,y_train=train_data.drop(['Price'],axis=1), train_data['Price']
        self.model.fit(X_train,y_train)

        test_data=X_test.join(y_test)
        test_data=test_data.select_dtypes(exclude=[object])
        # test_data['Landsize']=np.log(test_data['Landsize']+1)
        # test_data['Age']=np.log(test_data['Age']+1)
        test_data['BedroomRatio']=test_data['Bedroom']/ test_data['Rooms']
        X_test,y_test=test_data.drop(['Price'],axis=1),test_data['Price']

        prediction=self.model.predict(X_test)
        # Visualize Actual vs. Predicted Prices
        # plt.figure(figsize=(10, 6))

        # # Scatter plot of actual vs. predicted
        # plt.scatter(y_test, prediction, color='blue', alpha=0.5, label="Predicted vs Actual")

        # # Plot a line for reference (y=x)
        # max_price = max(y_test.max(), prediction.max())
        # min_price = min(y_test.min(), prediction.min())
        # plt.plot([min_price, max_price], [min_price, max_price], color='red', linestyle='--', label="Ideal Prediction")

        # # Add labels and title
        # plt.xlabel("Actual Price")
        # plt.ylabel("Predicted Price")
        # plt.title("Actual vs Predicted House Prices")
        # plt.legend()

        # # Display the plot
        # plt.show()
        print("Prediction", prediction)
        joblib.dump(self.model, self.model_path)

    def categorize_price(self, price):
        if price < self.price_quantiles[0.25]:
            return "Low"
        elif price < self.price_quantiles[0.75]:
            return "Medium"
        else:
            return "High"
        
    def predict(self,new_data):
        if(isinstance(new_data,pd.DataFrame)):
            new_data=new_data.select_dtypes(exclude=[object])
            new_data['Landsize'] = np.log(new_data['Landsize'] + 1)
            new_data['Age'] = np.log(new_data['Age'] + 1)
            new_data['BedroomRatio'] = new_data['Bedroom'] / new_data['Rooms']
            model = joblib.load('./housing_model.joblib')
        # Ensure the input has the same columns as training data
        return model.predict(new_data)

class HouseFeatures(BaseModel):
    rooms: int
    distance: float
    bedroom: int
    bathroom: int
    car: float
    landsize: int
    latitude: float
    longtitude: float
    propertycount:int
    age:int
x=HousingModel()
x.train()
columns1=['Rooms', 'Distance' , 'Bedroom' , 'Bathroom',  'Car',  'Landsize',  'Latitude',  'Longtitude',  'Propertycount' ,   'Age']
data=pd.DataFrame([[4,20,2,2,2,450,-37.818201,145.000390,12898,31]],columns=columns1)


print("predict", x.predict(data))
# print('Mean Squared Error: %.2f' % mean_squared_error(y_test, pythy_pred))
# print('R^2 Score: %.2f' % r2_score(y_test, y_pred))
# print('MAE: %.2f' % mean_absolute_error(y_test, y_pred))
