#AI APP README FILE
1.Project Setup

Prerequisites:
Installing Anaconda(https://www.anaconda.com/download)

A - Steps to Configure the Project Environment:
1. Create a Conda environment 

    conda create --name ai_env python=3.12

2. Activate the Conda environment

    conda activate ai_env

3. Install required libraries 

    conda install pandas numpy scikit-learn matplotlib seaborn

B - Data Processing:
1. Load the dataset:

    path = './Melbourne_housing.csv'
    melb_data = pd.read_csv(path)

2. Drop missing values:

    melb_data.dropna(inplace=True)

3. Feature Engineering:

    //Create a new column 'age' by subtracting 'yearbuilt' from the current year
    current_year = datetime.now().year
    melb_data['Age'] = current_year - melb_data['YearBuilt']
    //Dropping unnecessary columns for this project ( YearBuilt and Postcode)
    melb_data=melb_data.drop(['YearBuilt'],axis=1).drop(['Postcode'],axis=1)
    // Feature Engineering: Adding BedroomRatio
    melb_data['BedroomRatio']=melb_data['Bedroom']/ melb_data['Rooms']

4. Removing outliers:

    #Removing the outliers from the dataset
    Q1 = melb_data['Price'].quantile(0.25)
    Q2 = melb_data['Price'].quantile(0.5)
    Q3 = melb_data['Price'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    outliers = melb_data[(melb_data['Price'] < lower_bound) | (melb_data['Price'] > upper_bound)]
    for price in outliers['Price'].tolist():
        melb_data = melb_data[melb_data['Price'] != price]

C - Training Linear Regression model:

1. Setting features and target:

    X=melb_data.drop(['Price'],axis=1)
    y=melb_data['Price']

2. Splitting the data:

    X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

3. Join training datasets:

    train_data=X_train.join(y_train)
    train_data=train_data.select_dtypes(exclude=[object])

4. Normally redistribute data(we have figured out these 2 datas are skewed):

    train_data['Landsize']=np.log(train_data['Landsize']+1)
    train_data['Age']=np.log(train_data['Age']+1)

5. Separate the training data to features and target once again:

    X_train,y_train=train_data.drop(['Price'],axis=1), train_data['Price']

6. Creating models and fitting them with data:

    #creating 2 Regression models: linear and DecisionTree
    reg=LinearRegression()
    reg2=DecisionTreeRegressor()

    #Putting data into models
    reg.fit(X_train,y_train)
    reg2.fit(X_train,y_train)

7. Making testing data:

    In order to test the model, we need to modify some features included in testing dataset:
    #Join testing datasets
    test_data=X_test.join(y_test)
    #make data for these 2 columns normally distributed (not skewed) to improve performance of model
    test_data=test_data.select_dtypes(exclude=[object])
    test_data['Landsize']=np.log(test_data['Landsize']+1)
    test_data['Age']=np.log(test_data['Age']+1)
    #Separate into features and targets again
    X_test,y_test=test_data.drop(['Price'],axis=1),test_data['Price']

8.  Test the model:

    #Predicting results
    y_pred = reg.predict(X_test)
    y_pred2=reg2.predict(X_test)

    #Outputting metrics for 2 models
    # #Linear Regression
    
    print('Mean Squared Error: %.2f' % mean_squared_error(y_test, y_pred))
    print('R^2 Score: %.2f' % r2_score(y_test, y_pred))
    print('MAE: %.2f' % mean_absolute_error(y_test, y_pred))
    #DecisionTree
    print('Mean Squared Error for DecisionTree model: %.2f' % mean_squared_error(y_test, y_pred2))
    print('R^2 Score: %.2f' % r2_score(y_test, y_pred2))
    print('MAE: %.2f' % mean_absolute_error(y_test, y_pred2))

    Mean Squared Error: 91002224247.50
    R^2 Score: 0.58
    MAE: 225455.17
    Mean Squared Error for DecisionTree model: 74966188593.59
    R^2 Score: 0.65
    MAE: 185934.41

D - KNN Classification Model:
1. Feature engineering:

    #Feature Engineering: Adding PriceCategory into dataset
    melb_data['PriceCategory'] = pd.cut(melb_data['Price'], 
                                    bins=[-np.inf, Q1, Q3, np.inf], 
                                    labels=['Low', 'Medium', 'High'])

2. Setting features and target:

    X = melb_data.drop(['Price', 'PriceCategory','BuildingArea'], axis=1)
    y = melb_data['PriceCategory']

3. Standardize non-numeric data:

    #Standardize non-numeric data
    for column in X.columns:
        if X[column].dtype == 'object':
            le = LabelEncoder()
            X[column] = le.fit_transform(X[column])

4. Splitting the data:

    X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

5. Normally redistribute data:

    #Setting Scaler
    scaler = StandardScaler()
    #Redistributing data
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled=scaler.transform(X_test)

7. Creating models and fitting them with data:

    #Setting model 
    reg=KNeighborsClassifier(n_neighbors=5)
    #Putting data into model
    reg.fit(X_train_scaled,y_train)


8.  Test the model:
    #making predictions
    y_pred = reg.predict(X_test_scaled)

    #Outputting metrics for KNN model
    print('Acc Score: %.2f' % accuracy_score(y_test, y_pred))

    #Outputting visualization for KNN Model Prediction
    plt.figure(figsize=(10, 6))
    plt.scatter(X_test['Bedroom'], y_test, color='black', label='Actual values')
    plt.plot(X_test['Bedroom'], y_pred, color='blue', linewidth=3, label='Predicted values')
    plt.xlabel('Number of Bedrooms')
    plt.ylabel('House Price')
    plt.title('KNN classification on Melbourne Housing Dataset')
    plt.legend()
    plt.show() 

    Acc Score: 0.74
E - Making Predictions:
1.  Prepare New Data:
    Assume the new data is provided in a new_data.csv file.

    new_data = pd.read_csv('./data/new_data.csv')

2.  Preprocess New Data:

    For the model to predict properly with new data, we still have to clean and preprocess the data between putting them into the model:
    a. For example, Regression Model:
    new_data = pd.read_csv('./melb_data (2).csv')
    #Drop missing values
    new_data.dropna(inplace=True)

    #Adding new column
    current_year = datetime.now().year
    new_data=new_data.select_dtypes(exclude=[object])
    new_data['Age'] = current_year - new_data['YearBuilt']

    #Dropping unnecessary columns for this project ( YearBuilt and Postcode, Building Area because training data does not have this column, it has been dropped to get numeric values only)
    new_data=new_data.drop(['YearBuilt'],axis=1).drop(['Postcode'],axis=1).drop(['BuildingArea'],axis=1)

    #Feature Engineering: Adding BedroomRatio
    new_data['BedroomRatio']=new_data['Bedroom']/ new_data['Rooms']

    #Redistributing
    new_data['Landsize']=np.log(new_data['Landsize']+1)
    new_data['Age']=np.log(new_data['Age']+1)

    #Making features and target
    X_test2,y_test2=new_data.drop(['Price'],axis=1),new_data['Price']

    b. KNN Classifier:

    new_data = pd.read_csv('./melb_data (2).csv')

    #Drop missing values
    new_data.dropna(inplace=True)

    #Adding new column
    current_year = datetime.now().year
    new_data['Age'] = current_year - new_data['YearBuilt']

    #Dropping unnecessary columns for this project ( YearBuilt and Postcode, Building Area because training data does not have this column, it has been dropped to get numeric values only)
    new_data=new_data.drop(['YearBuilt'],axis=1).drop(['Postcode'],axis=1).drop(['BuildingArea'],axis=1)

    #Feature Engineering: Adding BedroomRatio and PriceCategory
    new_data['BedroomRatio']=new_data['Bedroom']/ new_data['Rooms']

    Q1 = new_data['Price'].quantile(0.25)
    Q2 = new_data['Price'].quantile(0.5)
    Q3 = new_data['Price'].quantile(0.75)

    new_data['PriceCategory'] = pd.cut(new_data['Price'], 
                                    bins=[-np.inf, Q1, Q3, np.inf], 
                                    labels=['Low', 'Medium', 'High'])

    #Setting features and target
    X_test2,y_test2=new_data.drop(['Price','PriceCategory'],axis=1),new_data['PriceCategory']

    for column in X_test2.columns:
        if X_test2[column].dtype == 'object':
            le = LabelEncoder()
            X_test2[column] = le.fit_transform(X_test2[column])
    X_test_scaled2=scaler.transform(X_test2)

3.  Making Predictions
    a.LinearRegression:
    y_pred3=reg.predict(X_test2)
    print('Mean Squared Error of New Data: %.2f' % r2_score(y_test2, y_pred3))

    #output
    Mean Squared Error of New Data: 0.50

    b.KNN Classifier
    y_pred3=reg.predict(X_test_scaled2)
    print('Acc Score of New Data: %.2f' % accuracy_score(y_test, y_pred))
    
    #output
    Acc Score of New Data: 0.81


