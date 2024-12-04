// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getDatabaseConnection } = require('./database');

// Define the local authentication strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Get a connection to the database
	const db = getDatabaseConnection();

	// Query the database to find the user by username
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        db.close();
        return done(err);
      }
      if (!user) {
        // Close the database connection and return an error if user is not found
		db.close();
        return done(null, false, { message: 'Incorrect username.' });
      }

	  // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, res) => {
        db.close();
        if (err) return done(err);
        if (res) {
          // Passwords match; authentication successful
          return done(null, user);
        } else {
          // Passwords do not match; authentication failed
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  })
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  // Store the user's ID in the session
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser((id, done) => {
  const db = getDatabaseConnection();
  
  // Query the database to retrieve user details by ID
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    db.close();
    done(err, user);
  });
});
