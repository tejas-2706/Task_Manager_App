// add a new task
// delete a task
// get all tasks by userifd
//  edit a task
import Joi from 'Joi'
import Task from '../models/task.js';

const NewTaskSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().optional(),
    priority: Joi.string(),
    status: Joi.string(),
    userId: Joi.string()
})

const UpdateTaskSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    priority: Joi.string().optional(),
    status: Joi.string().optional(),
    taskId: Joi.string()
})


const AddNewTask = async (req,res,next) => {
    const {title,description,priority,status,userId} = req.body;
    const {error} = NewTaskSchema.validate({
        title,
        description,
        priority,
        status,
        userId
    });
    if (error){
        return res.status(400).json({
            success: false,
            message : 'Task Details are Invalid format !! Keep it string !!'
        });
    } 
    try {
        const addNewTask = await Task.create({
            title,
            description,
            priority,
            status,
            userId
        })
        if (addNewTask){
            return res.status(200).json({
                success: true,
                message: 'Task Created Successfully !!',
                taskId: addNewTask._id
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message : 'Task Details are Invalid format !! Keep it string !!'
        });
    }
}


const GetAllTask = async (req,res,next) => {
    const {id} = req.params;
    
    try {
        const GetAllTasksByUserId = await Task.find({userId:id});
        if (GetAllTasksByUserId){
            return res.status(200).json({
                taskList: GetAllTasksByUserId
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
            message: "Error while Fetching All tasks !!"
        });
    }
}

const UpdateTask = async (req,res,next) => {
    const {_id, title, description, priority,status} = req.body;

    const {error, value} = UpdateTaskSchema.validate({
        taskId : _id,
        title,
        description,
        priority,
        status
    });

    if (error){
        return res.status(400).json({
            success: false,
            error: error,
            message: "Invalid data types!!"
        });
    }

    try {
        const {taskId: taskId, ...updateFields} = value;
        const updateTask = await Task.updateOne({_id:taskId}, {$set: updateFields });
        if (updateTask.matchedCount === 0){
            return res.status(404).json({
                success: false,
                message: 'Task not Found !!'
            })
        }
        if (updateTask.modifiedCount === 0){
            return res.status(404).json({
                success: false,
                message: 'No Changes Made to Task !!'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Your Fields Updates Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
            message: "Something Went Wrong !!"
        });
    }
}

const DeleteTask = async(req,res,next) => {
    const {id} = req.params;
    try {
        const deleteTask = await Task.deleteOne({_id:id});
        if (deleteTask.deletedCount > 0){
            return res.status(200).json({
                success: true,
                message: 'Deletes the Task Successfully !!'
            })
        }else {
            return res.status(404).json({
                success: false,
                message: 'Task not Found !!'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
            message: "Something Went Wrong !!"
        });
    }
}


export {AddNewTask,GetAllTask,UpdateTask,DeleteTask}