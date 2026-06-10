import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const service = new TaskService();

export const getTasks = async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const tasks = search ? await service.searchTasks(search) : await service.getAllTasks();
  res.render('index', { tasks });
};

export const addTask = async (req: Request, res: Response) => {
  const { title, taskType, extraInfo, deadline } = req.body;
  await service.addTask(taskType, title, extraInfo, new Date(deadline));
  res.redirect('/');
};

export const toggleTask = async (req: Request, res: Response) => {
  await service.toggleTask(req.params.id);
  res.redirect('/');
};

export const deleteTask = async (req: Request, res: Response) => {
  await service.deleteTask(req.params.id);
  res.redirect('/');
};

export const getEdit = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const task = await service.getTaskById(id);
  if (task) {
    res.render('edit', { task });
  } else {
    res.redirect('/');
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { title, extraInfo, deadline } = req.body;
  await service.updateTask(req.params.id, title, extraInfo, new Date(deadline));
  res.redirect('/');
};
