import { Tasks } from "../models/tasks.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTasks = async (req, res) => {
  try {
    const { name, description } = req.body;
    const done = req.body.done || false;
    if (!name || !description) {
      res.status(400).json({ error: "Name and description are required" });
    }

    const newTask = await Tasks.create({ name, description, done });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findByPk(id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, done, projectId } = req.body;

    const task = await Tasks.findByPk(id);
    task.set({ name, description, done, projectId });
    task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.destroy({
      where: {
        id,
      },
    });
    res.status(204).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTasks, postTasks, getTask, putTask, deleteTask };
