const setting = require('../../config/setting');
const state_model = require('../model/state');
const student_model = require('../model/student');
const fileController = require("./file");
const core_func = require('../utils/core_func');
//group
let getAllState = async (req, res) => {
    try {
        const item = await state_model.getAllState();
        return res.json({ result: item });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let createStudent = async (req, res) => {
    try {
        
        const data = req.body;
        console.log(data.stateId)
        const state = await state_model.findStateById(data.stateId);
        if (!state) return res.status(400).json({
            message: 'There is no state for that.'
        })
        
        let student= await student_model.createStudent(
            {
                state_id: data.stateId,
                name: data.name,
                school: data.school,
                branch: data.branch,
                governorate: data.governorate,
                institute: data.institute,
                phone: data.phone,
                poster: data.poster,
                code: data.code,
                identification: data.identification,
                total_amount: data.totalAmount,
                first_installment: data.firstInstallment,
                second_installment: data.secondInstallment,
                third_installment: data.thirdInstallment,
                forth_installment: data.forthInstallment,
                remain_amount: data.remaining,
                notes: data.notes
            }
        );
        var studentsOfstate = JSON.parse(state.students);
        studentsOfstate.push(student.insertId);
        var updatedStateStudents = JSON.stringify(studentsOfstate);
        await state_model.stateUpdate({ ...state, students: updatedStateStudents });
        
        return res.json({ message: 'Success' });
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
// let editGroup = async (req, res) => {
//     try {
//         const data = req.body;
//         data.updated_at = core_func.strftime(Date.now())
//         const exist = await group_model.existGroupNotMe(data.id, data.name);
//         if (exist) return res.status(401).json({ message: 'This group already exist.' });
//         await group_model.updateGroup(data);
//         return res.json({ message: 'Success!' });
//     }
//     catch (error) {
//         return res.status(400).json({
//             message: 'Something went wrong.', err: error
//         });
//     }
// }
// let delGroup = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const del = await group_model.delGroup(id);
//         return res.json({ message: 'Success' });
//     }
//     catch (error) {
//         return res.status(400).json({
//             message: 'Something went wrong.', err: error
//         });
//     }
// }
//user

let updateStudent = async (req, res) => {
    const data = req.body;
    console.log('edited', data);
    await student_model.updateStudent(data);
    return res.json({ message: 'Success' });
}
let deleteStudent = async (req, res) => {
    try {
        const id = req.params.studentId;
        const del = await student_model.deleteStudent(id);
        return res.json({ message: 'Success' });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let getBystate = async (req, res) => {
    try {
        console.log(req.params.stateId)
        const state = await state_model.findStateById(req.params.stateId);
        var studentsOfstate = JSON.parse(state.students);
        console.log(studentsOfstate)
        const students = await student_model.getStudentsByIds(studentsOfstate);
        
        return res.json({ result: students });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let getById = async (req, res) => {
    try {
        const studentId = parseInt(req.params.studentId);
        const studentData = await student_model.getById(studentId);

        return res.json({ result: studentData });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
module.exports = {
    getAllState,
    createStudent,
    getBystate,
    getById,
    updateStudent,
    deleteStudent
}
