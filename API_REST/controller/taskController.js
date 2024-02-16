let bd = [
  { id: 1, title: "Tarea 1", completed: true },
  { id: 2, title: "Tarea 2", completed: false },
  { id: 3, title: "Tarea 3", completed: true },
];

const getAllTasks = (req, res) => {
  res.status(200).json(bd);
};

const getOneTask = (req, res) => {
  const { id } = req.params;
  const task = bd.find((task) => task.id === parseInt(id));
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
};

const addTask = (req, res) => {
  const { title } = req.body;

  if (title?.length > 0) {
    const newTask = {
      id: bd[bd.length - 1]?.id + 1 || 1,
      title,
      completed: false,
    };
    bd.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: "title is required" });
  }
};

const editTask = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const index = bd.findIndex((task) => task.id === parseInt(id));

  if (index !== -1) {
    bd[index].title = title;
    res.status(200).json(bd[index]);
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  const index = bd.findIndex((task) => task.id === parseInt(id));

  if (index !== -1) {
    bd.splice(index, 1);
    return res.status(200).json({ message: "Task deleted" });
  }

  res.status(404).json({ error: "Task not found" });
};

const markAsCompleted = (req, res) => {
  const { id } = req.params;

  const task = bd.findIndex((task) => task.id === parseInt(id));

  if (task !== -1) {
    bd[task].completed = true;
    return res.status(200).json(bd[task]);
  }

  res.status(404).json({ error: "Task not found" });
};

const markAsUncompleted = (req, res) => {
  const { id } = req.params;
  const task = bd.findIndex((task) => task.id === parseInt(id));
  if (task !== -1) {
    bd[task].completed = false;
    return res.status(200).json(bd[task]);
  }
  res.status(404).json({ error: "Task not found" });
};

export default {
  getAllTasks,
  getOneTask,
  addTask,
  editTask,
  deleteTask,
  markAsCompleted,
  markAsUncompleted,
};
