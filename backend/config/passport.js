const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getDatabaseConnection } = require('./database');

passport.use(
  new LocalStrategy((username, password, done) => {
    const db = getDatabaseConnection();
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        db.close();
        return done(err);
      }
      if (!user) {
        db.close();
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        db.close();
        if (err) return done(err);
        if (res) {
          // Passwords match
          return done(null, user);
        } else {
          // Passwords do not match
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const db = getDatabaseConnection();
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    db.close();
    done(err, user);
  });
});
