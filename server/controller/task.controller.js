const TaskModel = require("../model/task.model");

const createTask = async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: "Task is required" });
    }
    try {
        await TaskModel.create({ task });
        res.status(200).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: "Task is required" });
    }
    try {
        await TaskModel.findOneAndUpdate({ _id: id }, { task });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await TaskModel.findOneAndDelete({ _id: id });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };