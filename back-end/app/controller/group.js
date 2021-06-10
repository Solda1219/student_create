const setting = require('../../config/setting');
const group_model = require('../model/group');
const user_model = require('../model/user');
const fileController = require("./file");
const core_func = require('../utils/core_func');
//group
let getGroup = async (req, res) => {
  try {
    const {id} = req.user;
    const item = await group_model.getGroup(id);
    for(let i = 0 ; i < item.length; i ++){
      const users = await group_model.getUser(item[i].id);
      item[i].users = users.length;
    }
    return res.json({ result: item });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let createGroup = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    const exist = await group_model.existGroup(data.name);
    if (exist) return res.status(401).json({ message: 'This group aready exist.' });
    await group_model.createGroup(
      {
        name: data.name,
        user_id: id,
        created_at: core_func.strftime(Date.now())
      }
    );
    return res.json({ message: 'Success' });
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let editGroup = async (req, res) => {
  try {
    const data = req.body;
    data.updated_at = core_func.strftime(Date.now())
    const exist = await group_model.existGroupNotMe(data.id, data.name);
    if (exist) return res.status(401).json({ message: 'This group already exist.' });
    await group_model.updateGroup(data);
    return res.json({ message: 'Success!' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let delGroup = async (req, res) => {
  try {
    const { id } = req.body;
    const del = await group_model.delGroup(id);
    return res.json({message: 'Success' });
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
    const {id} = req.body;
    const item = await group_model.getUser(id);
    return res.json({ result: item });
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
let createUser = async (req, res) => {
  try {
    const data = req.body;
    const exist = await group_model.existUser(data.group_id,data.email);
    const exist_user_indatabase = await user_model.exist(data.email);
    if (!exist_user_indatabase) return res.status(401).json({ message: 'This user not exist' });
    if (exist) return res.status(401).json({ message: 'This user already joined in the group.' });
    await group_model.createUser(
      {
        email: data.email,
        group_id: data.group_id,
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
    const exist = await group_model.existUserNotMe(id, data.group_id, data.email);
    const exist_user_indatabase = await user_model.exist(data.email);
    if (!exist_user_indatabase) return res.status(401).json({ message: 'This user not exist' });
    if (exist) return res.status(401).json({ message: 'This email already exist in the group.' });
    await group_model.updateUser(data);
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
    const del = await group_model.delUser(id);
    return res.json({message: 'Success' });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.', err: error
    });
  }
}
module.exports = {
  getGroup,
  createGroup,
  editGroup,
  delGroup,
  getUser,
  createUser,
  editUser,
  delUser,
}
