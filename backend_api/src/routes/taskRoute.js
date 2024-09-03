// taskRoute.js
import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

// Correctly use the functions from taskController
router.post('/createtasks', taskController.createTask);

router.get('/tasks', taskController.getTasks);

router.put('/updatetasks/:id', taskController.updateTask);

router.delete('/deletetasks/:id', taskController.deleteTask);

router.post('/tasks/:taskId/subtasks', taskController.addSubtask);

router.put('/tasks/:taskId/subtasks/:subtaskId', taskController.updateSubtask);

router.delete('/tasks/:taskId/subtasks/:subtaskId', taskController.deleteSubtask);

export default router;
