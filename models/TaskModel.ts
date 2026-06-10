import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  taskType: string;    
  extraInfo: string;
  deadline: Date;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  taskType: { type: String, required: true },
  extraInfo: { type: String },
  deadline: { type: Date },
  completed: { type: Boolean, default: false }
});

export default mongoose.model<ITask>('TaskDoc', TaskSchema);