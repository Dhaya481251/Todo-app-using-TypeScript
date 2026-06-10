"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalTask = void 0;
// models/PersonalTask.ts
const Task_1 = require("./Task");
class PersonalTask extends Task_1.Task {
    constructor(title, extraInfo, deadline, completed = false) {
        super(title, extraInfo, deadline, completed);
    }
    getDetails() {
        return `${this.title} [Personal] - ExtraInfo: ${this.extraInfo === "" ? "Nothing" : this.extraInfo} - Due: ${this.deadline.toDateString()} - ${this.completed ? "✅ Done" : "⬜ Pending"}`;
    }
}
exports.PersonalTask = PersonalTask;
