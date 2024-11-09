#How to get started

1. Installing the required packages
    navigate to node.js website: https://nodejs.org/en/
    download latest LTS version.

    in powershell or bash:
    pip install fastapi uvicorn sklearn numpy joblib


    cd frontend
    npm install

2. Starting up the front-end
    in powershell or bash:
    npm run build or npm start dev

    URL: http://localhost:3000/

3. Starting up back-end
    in powershell or bash

    cd backend
    uvicorn main:app --reload

    URL: http://127.0.0.1:8000/
