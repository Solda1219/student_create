const { hashPassword, verifyPassword } = require('../utils/authentication');
const setting = require('../../config/setting');
const user_model = require('../model/user');
const state_model = require('../model/state');
const fileController = require("./file");
const core_func = require('../utils/core_func');
//admin
let getAdmins = async (req, res) => {
  try {
    var items = await user_model.getAdmin();
    for (let i = 0; i < items.length; i++) {
      const { role } = items[i];
      var inserted_role_name = "";
      var role_name = await state_model.getRoleNameByRole(JSON.parse(role));
      if (JSON.parse(role).includes(-1)) {
        inserted_role_name = "Super Admin, " + role_name;
      }
      else {
        inserted_role_name = role_name;
      }
      items[i].role_name = inserted_role_name;
    }
    return res.json({ result: items });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}

let updateAdmin = async (req, res) => {
  try {
    let data = req.body;
    const { password, role } = data;
    if (password == '') {
      delete data.password;
    }
    else {
      data.password = await hashPassword(password);
    }
    data.role = JSON.stringify(role);
    await user_model.updateAdmin(data);
    return res.json({ message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let createAdmin = async (req, res) => {
  try {
    let data = req.body;
    const { password, role } = data;
    data.role = JSON.stringify(role);
    data.password = await hashPassword(password);
    await user_model.createAdmin(data);
    return res.json({ message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let deleteAdmin = async (req, res) => {
  try {
    const id = req.params.adminId;
    console.log('delid', id);
    const del = await user_model.deleteAdmin(id);
    return res.json({ message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let createAdmins = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await user_model.exist(email);
    if (exist) return res.status(401).json({ message: 'This email exist.' });
    const newpassword = await hashPassword(password);
    await user_model.create(
      {
        name: name,
        email: email,
        password: newpassword,
        status: 1,
        role: 2,
        created_at: core_func.strftime(Date.now())
      }
    );
    return res.json({ message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let editAdmins = async (req, res) => {
  try {
    const { id } = req.body;
    const data = req.body;
    data.updated_at = core_func.strftime(Date.now())
    const exist = await user_model.existNotMe(id, data.email);
    if (exist) return res.status(401).json({ message: 'This email already exist.' });
    await user_model.update(data);
    return res.json({ message: 'Success!' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let delAdmins = async (req, res) => {
  try {
    const { id } = req.body;
    const del = await user_model.del(id);
    return res.json({message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let resetPasswordAdmin = async (req, res) => {
  try {
    const { email, id } = req.body;
    const data = req.body;
    data.updated_at = core_func.strftime(Date.now())
    const exist = await user_model.exist(email);
    if (!exist) return res.status(401).json({ message: 'This email not exist.' });
    const password = await hashPassword('12345678');
    data.password = password;
    await user_model.update(data);
    return res.json({ message: '12345678 is new password.' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
//user
let getUser = async (req, res) => {
  try {
    const item = await user_model.getUser();
    return res.json({ result: item });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await user_model.exist(email);
    if (exist) return res.status(401).json({ message: 'This email exist.' });
    const newpassword = await hashPassword(password);
    await user_model.create(
      {
        name: name,
        email: email,
        password: newpassword,
        status: 1,
        role: 6,
        created_at: core_func.strftime(Date.now())
      }
    );
    return res.json({ message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let editUser = async (req, res) => {
  try {
    const { id } = req.body;
    const data = req.body;
    data.updated_at = core_func.strftime(Date.now());
    const exist = await user_model.existNotMe(id, data.email);
    if (exist) return res.status(401).json({ message: 'This email already exist.' });
    await user_model.update(data);
    return res.json({ message: 'Success!' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let delUser = async (req, res) => {
  try {
    const { id } = req.body;
    const del = await user_model.del(id);
    return res.json({message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let resetPasswordUser = async (req, res) => {
  try {
    const { email, id } = req.body;
    const data = req.body;
    data.updated_at = core_func.strftime(Date.now())
    const exist = await user_model.exist(email);
    if (!exist) return res.status(401).json({ message: 'This email not exist.' });
    const password = await hashPassword('12345678');
    data.password = password;
    await user_model.update(data);
    return res.json({ message: '12345678 is new password.' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
module.exports = {
  getAdmins,
  createAdmins,
  editAdmins,
  delAdmins,
  resetPasswordAdmin,
  getUser,
  createUser,
  editUser,
  delUser,
  resetPasswordUser,
  updateAdmin,
  createAdmin,
  deleteAdmin
}
