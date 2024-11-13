# Household Prediction

## Overview

This project includes a front-end and back-end setup, utilizing FastAPI for the back end and a Node.js-based front end. Follow the steps below to get the project running on your local machine.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js:** Download the latest LTS version from [nodejs.org](https://nodejs.org/en/).
- **Python packages:** FastAPI, Uvicorn, scikit-learn, numpy, and joblib.

---

## Installation

### 1. Install Required Packages

#### Back End (Python)

In PowerShell or Bash, run the following command:

```bash
pip install fastapi uvicorn sklearn numpy joblib
```
#### Front End (Node.js)
Navigate to the frontend directory and install the required Node.js packages:
```bash
cd frontend
npm install
```
#### Front End (Node.js)
Navigate to the frontend directory and install the required Node.js packages:

## Starting the Project
#### Start the Front End
In PowerShell or Bash, navigate to the frontend directory and use either command below to start the application:
```bash
# For building and running in production mode
npm run build 

# For development mode
npm run dev
```
Once started, you can access the front end at http://localhost:3000/.
#### Start the Back End
In PowerShell or Bash, navigate to the backend directory and start the FastAPI application with Uvicorn:
```bash
cd backend
uvicorn main:app --reload
```
Once running, you can access the back end at http://127.0.0.1:8000/.


