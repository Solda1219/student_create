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
let findStateById = async (id) => {
    try {
        const item = await query.get(statetable, '*', `WHERE id=${id}`);
        if (item.length > 0) return item[0];
    }
    catch (err) {
        return false;
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
    findStateById,
    stateUpdate,
    updateState,
    deleteState
}