"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getEdit = exports.deleteTask = exports.toggleTask = exports.addTask = exports.getTasks = void 0;
const TaskService_1 = require("../services/TaskService");
const service = new TaskService_1.TaskService();
const getTasks = async (req, res) => {
    const search = req.query.search;
    const tasks = search ? await service.searchTasks(search) : await service.getAllTasks();
    res.render('index', { tasks });
};
exports.getTasks = getTasks;
const addTask = async (req, res) => {
    const { title, taskType, extraInfo, deadline } = req.body;
    await service.addTask(taskType, title, extraInfo, new Date(deadline));
    res.redirect('/');
};
exports.addTask = addTask;
const toggleTask = async (req, res) => {
    await service.toggleTask(req.params.id);
    res.redirect('/');
};
exports.toggleTask = toggleTask;
const deleteTask = async (req, res) => {
    await service.deleteTask(req.params.id);
    res.redirect('/');
};
exports.deleteTask = deleteTask;
const getEdit = async (req, res) => {
    const id = req.query.id;
    const task = await service.getTaskById(id);
    if (task) {
        res.render('edit', { task });
    }
    else {
        res.redirect('/');
    }
};
exports.getEdit = getEdit;
const updateTask = async (req, res) => {
    const { title, extraInfo, deadline } = req.body;
    await service.updateTask(req.params.id, title, extraInfo, new Date(deadline));
    res.redirect('/');
};
exports.updateTask = updateTask;
