// index.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/database');
require('./config/passport');

const app = express();

// Initialize Database
initializeDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true,
  })
);

// Session Middleware
app.use(
  session({
    secret: 'hackathon_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 604800000, // 1 week
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/boats', require('./routes/boats'));
// Note: Bookings routes are now under /boats

// Start Server
const PORT = process.env.PORT || 3482;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
