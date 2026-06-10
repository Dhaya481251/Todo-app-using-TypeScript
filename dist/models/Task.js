"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(title, extraInfo, deadline, completed = false) {
        this.title = title;
        this.extraInfo = extraInfo;
        this.deadline = deadline;
        this.completed = completed;
    }
    toggle() {
        this.completed = !this.completed;
    }
}
exports.Task = Task;
