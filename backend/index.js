const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import cors
const { initializeDatabase } = require('./config/database');
require('./config/passport');

const app = express();

initializeDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow cookies to be sent
}));

// Session Middleware
app.use(
  session({
    secret: 'hackathon_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000, // 1 week in milliseconds
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

// Start Server
const PORT = process.env.PORT || 3482;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
