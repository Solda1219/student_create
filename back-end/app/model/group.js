const query = require('../utils/sqlQuery');
const grouptable = 'groups';
const groupusertable = 'group_users';
let getGroup = async (user_id) => {
    try {
       const item = await query.get(grouptable,'*',`WHERE user_id = ${user_id}`);
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let createGroup = async (data) => {
    try {
       const item = await query.create(grouptable,data);  
       return true
    }
    catch (err) {
       return false
    }
}
let updateGroup = async (data) => {
    try {
       const {id}=data;
       delete data.id;
       const update = await query.update(grouptable,data,`WHERE id=${id}`);
       return true
    }
    catch (err) {
        return false;
    }
}
let delGroup = async (id) => {
    try {
       const item = await query.del(grouptable,`WHERE id = ${id}`);  
       const delitem = await query.del(groupusertable,`WHERE group_id = ${id}`);  
       return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}
let getUser = async (group_id) => {
    try {
       const item = await query.get(groupusertable,'*',`WHERE group_id = ${group_id}`);
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let createUser = async (data) => {
    try {
       const item = await query.create(groupusertable,data);  
       return true
    }
    catch (err) {
       return false
    }
}
let updateUser = async (data) => {
    try {
       const {id}=data;
       delete data.id;
       const update = await query.update(groupusertable,data,`WHERE id=${id}`);
       return true
    }
    catch (err) {
        return false;
    }
}
let delUser = async (id) => {
    try {
       const item = await query.del(groupusertable,`WHERE id = ${id}`);  
       return true
    }
    catch (err) {
        return false
    }
}
let existGroup = async (val) => {
    try {
       const item = await query.get(grouptable,'*',`WHERE name='${val}'`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
let existGroupNotMe = async (id,val) => {
    try {
       const item = await query.get(grouptable,'*',`WHERE name='${val}' AND NOT id = ${id}`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
let existUser = async (group_id,email) => {
    try {
       const item = await query.get(groupusertable,'*',`WHERE email='${email}' AND group_id = ${group_id}`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
let existUserNotMe = async (id,group_id,email) => {
    try {
       const item = await query.get(groupusertable,'*',`WHERE email='${email}' AND NOT id = ${id} AND group_id = ${group_id}`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
module.exports = {
    getGroup,
    createGroup,
    updateGroup,
    delGroup,
    existGroupNotMe,
    existGroup,
    getUser,
    createUser,
    updateUser,
    delUser,
    existUserNotMe,
    existUser,
}