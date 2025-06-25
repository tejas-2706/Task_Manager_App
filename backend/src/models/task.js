import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    priority: String,
    status: String
})

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;