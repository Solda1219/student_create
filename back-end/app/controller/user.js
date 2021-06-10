const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');
const user_model = require('../model/user');
let login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //check request
    if(!username||!password) return res.status(401).json({message: 'Request is wrong.'})
    //check if username exist
    const user_data = await user_model.getUserByMail(username);
    if(user_data.length == 0) return res.status(401).json({message: 'Unknown Account.'})
    //check status
    const status = user_data[0].status;
    if(status == 0) return res.status(401).json({message: 'Your account is restricted. Please contact with support team.'})
    //check if password is correct
    const user = user_data[0];
    const u_password = user.password;
    const passwordValid = await verifyPassword(password, u_password);
    if (passwordValid) { 
      const ObjForToken={
        id:user.id, 
        email:user.email,
        name:user.name,
        role:user.role,
        role_name:user.role_name,
      };
      const token = createToken(ObjForToken);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const userInfo = user;
      return res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    } else return res.status(401).json({ message: 'Password is incorrect.'});
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: 'Something went wrong.', err: error
    });
  }
};
module.exports = {
  login,
}
