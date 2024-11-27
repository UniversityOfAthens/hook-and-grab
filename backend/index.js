const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = './users.json';

// Helper function to read users from the JSON file
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register a new user
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  // Check if the user already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Add the new user
  users.push({ name, email, password });
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login a user
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  // Check if the user exists and the password matches
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});