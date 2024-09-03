import Task from "../models/Task.model.js";

// Create a new task
const createTask = async (req, res) => {
    try {
        const task =new Task(req.body);
        await task.save();
        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a subtask
const addSubtask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.subtasks.push(req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a subtask
const updateSubtask = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const subtask = task.subtasks.id(subtaskId);
        if (!subtask) {
            return res.status(404).json({ message: 'Subtask not found' });
        }

        subtask.set(req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subtask
const deleteSubtask = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Use pull to remove subtask by its _id
        task.subtasks.pull(subtaskId);

        await task.save();
        return res.status(200).json({message: 'task deleted'});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask
};
