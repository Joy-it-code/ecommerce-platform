# 🛒 E-commerce Platform CI/CD Pipeline

## 📌 Introduction

This is a full-stack web application designed for seamless online shopping. This platform features user authentication, product listings, cart functionality, and order management.

This project follows a DevOps-oriented approach, integrating GitHub Actions, Docker, and AWS EC2 for automated deployment and scalability.

## 🎯 Project Overview
The E-commerce Platform consists of a React.js frontend and a Node.js/Express.js backend. The project is deployed on AWS EC2 with CI/CD automation using GitHub Actions. 

The goal is to automate the integration and deployment process for both components using Github Actions, ensuring continous delivery and integration.

## 🛠 Step-by-Step Method

## 📌 Step 1:Set Up Your GitHub Repository
1. Go to GitHub and create a new repository named ecommerce-platform

2. Clone the repository to your local machine:

```
git clone https://github.com/Joy-it-code/ecommerce-platform.git
cd ecommerce-platform
```

![](./img/1a.create.repo.png)
![](./img/1b.clone.png)

## 📌 Step 1.2:  Initialize Project Structure
1. Inside the repository, create directories for the backend and frontend: 
```
mkdir api webapp
```
![](./img/1c.mkdir.png)

2. Navigate to the backend folder and initialize a Node.js project:

```
cd api
npm init -y
```
![](./img/1d.cd.api.png)
Backend runs on http://localhost:5000

3. Navigate to the frontend folder and create a React app:
```
cd ../webapp
npx create-react-app .
```
[](./img/1e.cd.web.png)
Frontend runs on http://localhost:3000

## 📌 Step 2: Initialize GitHub Actions
2.1 Set Up GitHub Actions Directory

1. Inside the repository, create a .github/workflows directory:
```
mkdir -p .github/workflows
```
2. Create an empty workflow file for CI/CD:
```
touch .github/workflows/ci.yml
```
![](./img/2a.gitworkflow.png)

## 📌 Step 3: Backend API Setup
3.1: Install Dependencies

1. Inside the api folder, install Express:
```
npm install express
```
![](./img/2b.install.express.png)

2. Create an index.js file and add the following:

```
nano index.js
```
```
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Only start the server if the file is run directly, not during tests
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export app for testing
```

3. Run the API locally:
```
node index.js
```
![](./img/2d.run.locally.png)

## 📌 Step 3.2 Implement Unit Tests For API

1. Install Jest and Supertest:
```
npm install --save-dev jest supertest
```
![](./img/2e.install.api.test.png)

2. Add test scripts in package.json:
```
"scripts": {
    "test": "jest --detectOpenHandles --forceExit --runInBand"
}
```

3. Create a test folder and add a test file (api.test.js):

```
mkdir test
touch test/api.test.js
```
```
const request = require('supertest');
const app = require('../index'); // Import app without starting the server

describe('API Tests', () => {
    it('GET / should return API message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('E-commerce API is running...');
    });
});
```

## 4. ✅ Running Tests 🧪:

+ Install new dependencies:
```
npm install
```
![](./img/2f.install.npm.png)

+  Run the server in development mode:
```
npm run dev
 ```
![](./img/2g.run.dev.png)

+ ✅ Run tests 🧪:
```
npm test
```
![](./img/2h.npm.test.png)

+ Run on browser: 
```
http://localhost:5000
```
![](./img/2i.localhost.png)

## 📌 Step 4: Frontend Web Application Setup
### 🔹4.1 Install Dependencies

+ Inside the webapp directory, install React Router:
```
npm install react-router-dom
```
![](./img/3a.npm.react.png)

### 🔹4.2 Basic E-commerce Features
+ Modify src/App.js to include product listing:

```
import React from 'react';

function App() {
    return (
        <div>
            <h1>Welcome to E-commerce Platform</h1>
        </div>
    );
}

export default App;
```

+ Run the frontend locally and on Browser:
```
npm start
http://localhost:3000
```
![](./img/3c.npm.start.png)
![](./img/3b.localhost.3000.png)


## 📌 Step 5: Continuous Integration Workflow

+ Create a CI workflow in .github/workflows/ci.yml

```
name: CI Pipeline

on: push

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22
      - name: Install dependencies
        run: |
          cd api
          npm install
      - name: Run tests
        run: |
          cd api
          npm test

  frontend-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22
      - name: Install dependencies
        run: |
          cd webapp
          npm install
      - name: Build application
        run: |
          cd webapp
          npm run build
```

