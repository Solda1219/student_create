const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const setting = require('../../config/setting');
const createToken = (user) => {
  return jwt.sign(
    user,
    setting.jwt.secret,
    { algorithm: 'HS256', expiresIn: setting.jwt.expiry }
  );
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if(String(password).search('$2a$12$')!=-1){
        resolve(password);
      }
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
const hashLaravelPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if(String(password).search('$2a$12$')!=-1){
        resolve(password);
      }
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        const  finalNodeGeneratedHash = nodeGeneratedHash.replace('$2a$', '$2y$');
        resolve(finalNodeGeneratedHash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};
const verifyLaravelPassword = (passwordAttempt, hashedPassword) => {
  const finalNodeGeneratedHash = hashedPassword.replace('$2y$', '$2a$');
  return bcrypt.compare(passwordAttempt, finalNodeGeneratedHash);
};
module.exports = {
  createToken,
  hashPassword,
  hashLaravelPassword,
  verifyPassword,
  verifyLaravelPassword,
};
