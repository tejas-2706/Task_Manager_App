import express from 'express'
import { AddNewTask, DeleteTask, GetAllTask, UpdateTask } from '../controllers/taskController.js';


const taskRouter = express.Router();

taskRouter.post('/add', AddNewTask);
taskRouter.get('/get-all-tasks/:id',GetAllTask);//dynamic id
taskRouter.put('/update', UpdateTask);
taskRouter.delete('/delete/:id', DeleteTask);

export default taskRouter;