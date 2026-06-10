"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkTask = void 0;
const Task_1 = require("./Task");
class WorkTask extends Task_1.Task {
    constructor(title, extraInfo, deadline, completed = false) {
        super(title, extraInfo, deadline, completed);
    }
    getDetails() {
        return `${this.title} [Work] - ExtraInfo: ${this.extraInfo === "" ? "Nothing" : this.extraInfo} - Due: ${this.deadline.toDateString()} - ${this.completed ? "✅ Done" : "🟥 Pending"}`;
    }
}
exports.WorkTask = WorkTask;
