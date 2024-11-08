import pandas as pd
import numpy as np #remove maybe
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

sns.set_theme(style="darkgrid")

# read dataset
path = './melb_data (2).csv'
melb_data = pd.read_csv(path)

# data cleaning - drop rows with missing values, duplicates and/or incorrect values
melb_data.dropna()
melb_data.drop_duplicates(inplace=True)

# rename column 
melb_data.rename(columns={'Distance': 'DistanceToCBD', 'Rooms': 'Bedroom', 'BuildingArea': 'BuildingSize', 'Car': 'CarSpots'}, inplace=True)

X=melb_data.drop(['Price'],axis=1)
y=melb_data['Price']

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)
train_data=X_train.join(y_train)

train_data.hist()


print('Mean Squared Error: %.2f' % mean_squared_error(y_test, y_pred))
print('R^2 Score: %.2f' % r2_score(y_test, y_pred))
print('MAE: %.2f' % mean_squared_error(y_test, y_pred))


