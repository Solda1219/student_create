const query = require('../utils/sqlQuery');
const statetable = 'states';
let getAllState = async () => {
    try {
        const item = await query.get(statetable, '*', `WHERE id > 0`);
        return item;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let createState = async (data) => {
    try {
        const item = await query.create(statetable, data);
        return true
    }
    catch (err) {
        return false
    }
}
let findStatesByIds = async (ids) => {
    try {
        let states = [];
        for (let i = 0; i < ids.length; i++){
            const item = await query.get(statetable, '*', `WHERE id=${ids[i]}`);
            if (item.length > 0) states.push(item[0]);
        }
        return states;
    }
    catch (err) {
        return false;
    }
}

let getRoleNameByRole = async (roles) => {
    var role_name = "";
    try {
        for (let i = 0; i < roles.length; i++) {
            const item = await query.get(statetable, '*', `WHERE id= ${roles[i]}`);
            if (item.length > 0) {
                role_name+= item[0].state_name+ ", ";
            }
        }

        return role_name;
    }
    catch (err) {
        console.log(err)
        return [];
    }
}
let stateUpdate = async (data) => {
    try {
        const { id } = data;
        delete data.id;
        const update = await query.update(statetable, data, `WHERE id=${id}`);
        return true
    }
    catch (err) {
        return false;
    }
}
let updateState = async (data) => {
    try {
        const { id } = data;
        delete data.id;
        const update = await query.update(statetable, data, `WHERE id=${id}`);
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

let deleteState = async (id) => {
    try {
        const item = await query.del(statetable, `WHERE id = ${id}`);
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

let existState = async (val) => {
    try {
        const item = await query.get(statetable, '*', `WHERE state_name='${val}'`);
        if (item.length == 0) return false;
        return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

module.exports = {
    getAllState,
    createState,
    existState,
    findStatesByIds,
    stateUpdate,
    updateState,
    deleteState,
    getRoleNameByRole
}