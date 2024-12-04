// utils/helpers.js

function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  sanitizeUser,
};
