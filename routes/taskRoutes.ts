import express from 'express';
import * as controller from '../controllers/TaskController';

const router = express.Router();

router.get('/', controller.getTasks);
router.post('/add', controller.addTask);
router.post('/toggle/:id', controller.toggleTask);
router.post('/delete/:id', controller.deleteTask);
router.get('/edit',controller.getEdit);
router.post('/edit/:id', controller.updateTask);

export default router;