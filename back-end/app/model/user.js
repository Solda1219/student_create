const query = require('../utils/sqlQuery');
const table = 'user';
let getter = async () => {
    try {
       const item = await query.lawQuery(
           `
           SELECT
           user.*,
           user_role.role_name as role_name
           FROM ${table}
           LEFT JOIN
           ON user.role = user_role.id
           `
       );
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let getAdmin = async () => {
    try {
       const item = await query.get(table,'*',`WHERE role = 2`);
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let getUser = async () => {
    try {
       const item = await query.get(table,'*',`WHERE role = 6`);
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let create = async (data) => {
    try {
       const item = await query.create(table,data);  
       return true
    }
    catch (err) {
       return false
    }
}
let update = async (data) => {
    try {
       const {id}=data;
       delete data.id;
       const update = await query.update(table,data,`WHERE id=${id}`);
       return true
    }
    catch (err) {
        return false;
    }
}
let del = async (id) => {
    try {
       const item = await query.del(table,`WHERE id = ${id}`);  
       return true
    }
    catch (err) {
        return false
    }
}
let getUserByMail = async (val) => {
    try {
       const item = await query.get(table,'*',`WHERE email='${val}'`);
       return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let exist = async (val) => {
    try {
       const item = await query.get(table,'*',`WHERE email='${val}'`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
let existNotMe = async (id,val) => {
    try {
       const item = await query.get(table,'*',`WHERE email='${val}' AND NOT id = ${id}`);
       if(item.length==0) return false;
       return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
module.exports = {
    getter,
    getAdmin,
    getUser,
    create,
    update,
    del,
    existNotMe,
    exist,
    getUserByMail,
}