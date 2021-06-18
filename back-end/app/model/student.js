const query = require('../utils/sqlQuery');
const studenttable = 'students';
let createStudent = async (data) => {
    try {
        const item = await query.create(studenttable, data);
        return item
    }
    catch (err) {
        return false
    }
}

let getAllStudent = async () => {
    try {
        const students = await query.get(studenttable, '*', `WHERE id> 0`);
        return students;
    }
    catch (err) {
        return false
    }
}

let getStudentsByStateIds = async (stateIds) => {
    let students = [];
    try {
        for (let i = 0; i < stateIds.length; i++){
            let newStudents= students
            const item = await query.get(studenttable, '*', `WHERE state_id=${stateIds[i]}`);
            if (item.length > 0) {
                students = newStudents.concat(item);
            } 
        }
        return students;
    }
    catch (err) {
        return false
    }
}

let getStudentsByIds = async (ids) => {
    let students = [];
    try {
        for (let i = 0; i < ids.length; i++){
            const item = await query.get(studenttable, '*', `WHERE id=${ids[i]}`);
            if (item.length > 0) {
                students.push(item[0]);
            }
        }
        return students;
    }
    catch (err) {
        return false
    }
}
let getById = async (id) => {
    try {
        const students = await query.get(studenttable, '*', `WHERE id=${id}`);
        if (students.length > 0) {
            return students[0];
        }
        return {};
    }
    catch (err) {
        return false
    }
}
let updateStudent = async (data) => {
    try {
        const { id } = data;
        delete data.id;
        console.log("heredata?", data);
        const update = await query.update(studenttable, data, `WHERE id=${id}`);
        console.log("here update?", update);
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

let deleteStudent = async (id) => {
    try {
        const item = await query.del(studenttable, `WHERE id = ${id}`);
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

let deleteStudentsByStateId = async (id) => {
    try {
        const item = await query.del(studenttable, `WHERE state_id = ${id}`);
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    createStudent,
    getStudentsByIds,
    getById,
    updateStudent,
    deleteStudent,
    getAllStudent,
    getStudentsByStateIds,
    deleteStudentsByStateId
}