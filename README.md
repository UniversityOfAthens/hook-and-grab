# BlueEco-pedia

### Project Submission for the 2nd Blue & Circular Economy Hackathon

## Introduction
BlueEco-pedia is a project developed for the 2nd Blue & Circular Economy Hackathon. Its purpose is to provide information and resources related to blue and circular economy practices in an engaging, interactive manner.

## Technologies Used
- **Frontend**: React, Vite, Bootstrap, React Router
- **Backend**: Node.js, Express, CORS, Body-Parser
- **Database**: SQLite3 for local storage
- **Other Tools**: Axios for HTTP requests, ESLint for code linting, Nodemon for development

## More Information
- For more information about the frontend, see [docs/frontend/frontend.md](docs/frontend/frontend.md).
- For more information about the backend, see [docs/index.md](docs/index.md).

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node Package Manager (included with Node.js)

### Installation and Running the Project
To run both the backend and frontend simultaneously, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/BlueEco-pedia.git
   cd BlueEco-pedia
   ```

2. **Add the Original Repository as Upstream Remote:**
   ```bash
   git remote add upstream https://github.com/UniversityOfAthens/BlueEco-pedia.git
   ```

3. **Start the Application:**
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

## Contribution Guidelines

### Creating a Branch
1. **Create a New Branch:**
   ```bash
   git checkout -b <branch-name>
   ```
   - **Example:**
     ```bash
     git checkout -b fix-login-bug
     ```
   - **Tip:** Choose a branch name that clearly describes the purpose of the branch.

### Making Changes
1. **Make Your Changes in the Codebase.**
2. **Stage the Changes:**
   ```bash
   git add .
   ```
3. **Commit the Changes:**
   ```bash
   git commit -m "Description of your changes"
   ```

### Creating a Pull Request
1. **Push Your Branch to the Forked Repository:**
   ```bash
   git push origin <branch-name>
   ```
2. **Create a Pull Request:**
   - Go to the original repository on GitHub.
   - Click on the "Compare & pull request" button for your branch.
   - Provide a clear description of your changes and submit the pull request.
3. **Wait for Review:**
   - Your pull request will be reviewed by the project maintainers.
   - Make any necessary revisions based on feedback.

---

## Documentation

- **Main Documentation:** [docs/index.md](docs/index.md)
- **Frontend Documentation:** [docs/frontend/frontend.md](docs/frontend/frontend.md)
- **Backend Documentation:** [docs/backend/README.md](docs/backend/README.md)

---
