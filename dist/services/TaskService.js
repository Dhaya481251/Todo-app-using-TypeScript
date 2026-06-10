"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const TaskModel_1 = __importDefault(require("../models/TaskModel"));
const WorkTask_1 = require("../models/WorkTask");
const PersonalTask_1 = require("../models/PersonalTask");
class TaskService {
    async addTask(taskType, title, extraInfo, deadline) {
        const normalizedType = taskType.toLowerCase(); // 👈 ensure lowercase
        let task;
        switch (normalizedType) {
            case 'work':
                task = new WorkTask_1.WorkTask(title, extraInfo, deadline);
                break;
            case 'personal':
                task = new PersonalTask_1.PersonalTask(title, extraInfo, deadline);
                break;
            default:
                throw new Error(`Invalid task type: ${taskType}`);
        }
        await TaskModel_1.default.create({
            title: task.title,
            taskType: normalizedType, // 👈 store normalized version
            extraInfo: task.extraInfo,
            deadline: new Date(deadline),
            completed: task.completed
        });
    }
    async getAllTasks() {
        const docs = await TaskModel_1.default.find().sort({ deadline: 1 });
        return docs.map(doc => {
            const { title, taskType, extraInfo, deadline, completed, _id } = doc;
            const task = this.instantiateTask(taskType, title, extraInfo, new Date(deadline), completed);
            return {
                _id,
                completed,
                details: task.getDetails()
            };
        });
    }
    async searchTasks(query) {
        const docs = await TaskModel_1.default.find({ title: { $regex: query, $options: 'i' } });
        return docs.map(doc => {
            const { title, taskType, extraInfo, deadline, completed, _id } = doc;
            const task = this.instantiateTask(taskType, title, extraInfo, new Date(deadline), completed);
            return {
                _id,
                completed,
                details: task.getDetails()
            };
        });
    }
    async toggleTask(id) {
        const task = await TaskModel_1.default.findById(id);
        if (task) {
            task.completed = !task.completed;
            await task.save();
        }
    }
    async deleteTask(id) {
        await TaskModel_1.default.findByIdAndDelete(id);
    }
    async getTaskById(id) {
        return await TaskModel_1.default.findById(id);
    }
    async updateTask(id, title, extraInfo, deadline) {
        await TaskModel_1.default.findByIdAndUpdate(id, { title, extraInfo, deadline });
    }
    instantiateTask(taskType, title, extraInfo, deadline, completed) {
        const type = taskType?.toLowerCase?.(); // handle undefined or mixed case
        switch (type) {
            case 'work':
                return new WorkTask_1.WorkTask(title, extraInfo, deadline, completed);
            case 'personal':
                return new PersonalTask_1.PersonalTask(title, extraInfo, deadline, completed);
            default:
                console.warn(`⚠️ Unknown task type encountered: ${taskType}`);
                return new PersonalTask_1.PersonalTask(title, extraInfo, deadline, completed); // fallback
        }
    }
}
exports.TaskService = TaskService;
