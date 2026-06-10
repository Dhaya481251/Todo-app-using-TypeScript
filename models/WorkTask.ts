
import { Task } from './Task';

export class WorkTask extends Task {
  constructor(
    title: string,
    extraInfo:string,
    deadline: Date,
    completed: boolean = false
  ) {
    super(title, extraInfo, deadline, completed);
  }

  getDetails(): string {
    return `${this.title} [Work] - ExtraInfo: ${this.extraInfo==="" ? "Nothing" : this.extraInfo} - Due: ${this.deadline.toDateString()} - ${this.completed ? "✅ Done" : "🟥 Pending"}`;
  }
}