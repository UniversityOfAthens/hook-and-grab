// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getDatabaseConnection } = require('./database');

// Define the local authentication strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const db = getDatabaseConnection();

    // Select only necessary fields including password for verification
    db.get(
      'SELECT id, username, password, email, firstName, lastName, dateOfBirth, phone, profilePicture FROM users WHERE username = ?',
      [username],
      (err, user) => {
        if (err) {
          db.close();
          return done(err);
        }
        if (!user) {
          db.close();
          return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, res) => {
          db.close();
          if (err) return done(err);
          if (res) {
            // Passwords match; authentication successful
            // Exclude password from user object
            const { password, ...userWithoutPassword } = user;
            return done(null, userWithoutPassword);
          } else {
            // Passwords do not match; authentication failed
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      }
    );
  })
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser((id, done) => {
  const db = getDatabaseConnection();

  // Select only necessary fields, excluding password
  db.get(
    'SELECT id, username, email, firstName, lastName, dateOfBirth, phone, profilePicture FROM users WHERE id = ?',
    [id],
    (err, user) => {
      db.close();
      done(err, user);
    }
  );
});
