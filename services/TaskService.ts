import TaskDoc , {ITask} from '../models/TaskModel';
import { Task } from '../models/Task';
import { WorkTask } from '../models/WorkTask';
import { PersonalTask } from '../models/PersonalTask';

export class TaskService {
  async addTask(taskType: string, title: string, extraInfo: string, deadline: Date): Promise<void> {
  const normalizedType = taskType.toLowerCase(); // 👈 ensure lowercase
  let task: Task;

  switch (normalizedType) {
    case 'work':
      task = new WorkTask(title, extraInfo, deadline);
      break;
    case 'personal':
      task = new PersonalTask(title, extraInfo, deadline);
      break;
    default:
      throw new Error(`Invalid task type: ${taskType}`);
  }

  await TaskDoc.create({
    title: task.title,
    taskType: normalizedType,   // 👈 store normalized version
    extraInfo: task.extraInfo,
    deadline: new Date(deadline),
    completed: task.completed
  });
}

  async getAllTasks(): Promise<any[]> {
    const docs = await TaskDoc.find().sort({ deadline: 1 });
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

  async searchTasks(query: string): Promise<any[]> {
    const docs = await TaskDoc.find({ title: { $regex: query, $options: 'i' } });
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

  async toggleTask(id: string): Promise<void> {
    const task = await TaskDoc.findById(id);
    if (task) {
      task.completed = !task.completed;
      await task.save();
    }
  }

  async deleteTask(id: string): Promise<void> {
    await TaskDoc.findByIdAndDelete(id);
  }
  
  async getTaskById(id:string): Promise<ITask | null> {
    return await TaskDoc.findById(id);
  }

  async updateTask(id: string, title: string, extraInfo: string, deadline: Date): Promise<void> {
    await TaskDoc.findByIdAndUpdate(id, { title, extraInfo, deadline });
  }

  private instantiateTask(taskType: string, title: string, extraInfo:string, deadline: Date, completed: boolean): Task {
  const type = taskType?.toLowerCase?.(); // handle undefined or mixed case

  switch (type) {
    case 'work':
      return new WorkTask(title, extraInfo, deadline, completed);
    case 'personal':
      return new PersonalTask(title, extraInfo, deadline, completed);
    default:
      console.warn(`⚠️ Unknown task type encountered: ${taskType}`);
      return new PersonalTask(title, extraInfo, deadline, completed); // fallback
  }
}

}