import pandas as pd
import numpy as np #remove maybe
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.calibration import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import accuracy_score, classification_report
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from datetime import datetime

sns.set_theme(style="darkgrid")
# read dataset
path = './Melbourne_housing.csv'
melb_data = pd.read_csv(path)

# data cleaning - drop rows with missing values, duplicates and/or incorrect values
melb_data.dropna(inplace=True)
current_year = datetime.now().year

# Create a new column 'age' by subtracting 'yearbuilt' from the current year
melb_data['Age'] = current_year - melb_data['YearBuilt']


melb_data=melb_data.drop(['YearBuilt'],axis=1).drop(['Postcode'],axis=1)
melb_data=melb_data.select_dtypes(exclude=[object])
melb_data['BedroomRatio']=melb_data['Bedroom']/ melb_data['Rooms']
Q1 = melb_data['Price'].quantile(0.25)
Q2 = melb_data['Price'].quantile(0.5)
Q3 = melb_data['Price'].quantile(0.75)

IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(upper_bound)
print(lower_bound)

outliers = melb_data[(melb_data['Price'] < lower_bound) | (melb_data['Price'] > upper_bound)]
for price in outliers['Price'].tolist():
    melb_data = melb_data[melb_data['Price'] != price]
    
melb_data['PriceCategory'] = pd.cut(melb_data['Price'], 
                                   bins=[-np.inf, Q1, Q3, np.inf], 
                                   labels=['Low', 'Medium', 'High'])
X = melb_data.drop(['Price', 'PriceCategory'], axis=1)
y = melb_data['PriceCategory']

for column in X.columns:
    if X[column].dtype == 'object':
        le = LabelEncoder()
        X[column] = le.fit_transform(X[column])


X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled=scaler.transform(X_test)
reg=KNeighborsClassifier(n_neighbors=5)

reg.fit(X_train_scaled,y_train)

test_data=X_test.join(y_test)
test_data=test_data.select_dtypes(exclude=[object])
test_data['Landsize']=np.log(test_data['Landsize']+1)
test_data['Age']=np.log(test_data['Age']+1)
test_data['BedroomRatio']=test_data['Bedroom']/ test_data['Rooms']

y_pred = reg.predict(X_test_scaled)


print('Acc Score: %.2f' % accuracy_score(y_test, y_pred))


