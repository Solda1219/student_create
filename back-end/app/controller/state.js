const setting = require('../../config/setting');
const state_model = require('../model/state');
const user_model = require('../model/user');
const student_model= require('../model/student');
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
let createState = async (req, res) => {
    try {
        console.log('zzz')
        const data = req.body;
        const exist = await state_model.existState(data.name);
        if (exist) return res.status(401).json({ message: 'This state aready exist.' });
        await state_model.createState(
            {
                state_name: data.name,
                governorate: data.governorate,
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
let updateState = async (req, res) => {
    try {
        let data = req.body;
        console.log('edited', data);
        let id = data.id;
        let modifiedData = {id: id, state_name: data.name, governorate: data.governorate };

        await state_model.updateState(modifiedData);
        return res.json({ message: 'Success' });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
let deleteState = async (req, res) => {
    try {
        const id = req.params.stateId;
        const del = await state_model.deleteState(id);
        await student_model.deleteStudentsByStateId(id);
        return res.json({ message: 'Success' });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Something went wrong.', err: error
        });
    }
}
module.exports = {
    getAllState,
    createState,
    updateState,
    deleteState
}
