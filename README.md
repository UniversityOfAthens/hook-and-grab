# Hook&Grab

<img src="presentation/logo.png" alt="Hook&Grab Logo" width="150" />

### Project Submission for Odyssea's 2nd Blue & Circular Economy Hackathon

## Introduction
Hook&Grab is a project developed for Odyssea's 2nd Blue & Circular Economy Hackathon. Its purpose is to provide information and resources related to blue and circular economy practices in an engaging, interactive manner.

## Technologies Used
- **Frontend**: React, Vite, Bootstrap, React Router
- **Backend**: Node.js, Express, CORS, Body-Parser
- **Database**: SQLite3
- **Other Tools**: Axios for HTTP requests, Prettier for code formatting, Nodemon

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node Package Manager (included with Node.js)

### Installation and Running the Project
To run both the backend and frontend simultaneously, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/hook-and-grab.git
   cd BlueEco-pedia
   ```

2. **Start the Application:**
   At the root of the project, run:
   ```bash
   npm start
   ```
   - This command will:
     - Automatically install all necessary dependencies for both backend and frontend.
     - Launch both the backend and frontend servers concurrently.
   - **Backend Server:** Runs at `http://localhost:3482`
   - **Frontend Server:** Runs at `http://localhost:5173`

### Formatting Code
To maintain consistent code formatting across the project, use the following commands:

- **Format Both Frontend and Backend:**
  ```bash
  npm run format
  ```

- **Format a Specific Directory:**
  Navigate to the desired directory (e.g., `frontend` or `backend`) and run:
  ```bash
  npm run format
  ```

## API Tester and Test Suite

### API Tester GUI
A graphical API tester is available to interactively test the API endpoints.

- **Location:** `docs/resources/api_tester`
- **How to Run:**
  1. Navigate to the API tester directory:
     ```bash
     cd docs/resources/api_tester
     ```
  2. Start the HTTP server:
     ```bash
     npm start
     ```
    - Note: This will also install missing dependencies
  3. Open your browser and go to `http://localhost:2502/` to access the GUI.

### Alternative API Test Suite
An alternative Python-based API test suite is also available for testing the API.

- **Location:** `docs/resources/api_test_suite.py`
- **How to Use:**
  1. Ensure you have Python installed.
  2. Navigate to the test suite directory:
     ```bash
     cd docs/resources
     ```
  3. Run the test script:
     ```bash
     python api_test_suite.py
     ```
  - **Note:** This script provides basic API testing functionalities and is less feature-rich compared to the GUI-based tester.

---

## Documentation

- **Main Documentation:** [docs/index.md](docs/index.md)

---
