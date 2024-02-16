let bd = [
  { id: 1, title: "Tarea 1", completed: true },
  { id: 2, title: "Tarea 2", completed: false },
  { id: 3, title: "Tarea 3", completed: true },
];

const getAllTasks = (req, res) => {
  res.render("index", { title: "Inicio", tasks: bd });
};

const getAddTaskForm = (req, res) => {
  res.render("add", { title: "Añadir Tarea" });
};

const getEditTaskForm = (req, res) => {
  const { id } = req.params;
  const task = bd.find((task) => task.id === parseInt(id));

  if (!task) {
    res.redirect("/");
  }

  res.render("edit", { title: "Editar Tarea", task });
};

const addTask = (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: bd[bd.length - 1]?.id + 1 || 1,
    title,
    completed: false,
  };
  bd.push(newTask);
  res.redirect("/");
};

const editTask = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  bd = bd.map((task) => {
    if (task.id === parseInt(id)) {
      task.title = title;
    }
    return task;
  });

  res.redirect("/");
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  bd = bd.filter((task) => task.id !== parseInt(id));
  res.redirect("/");
};

const markAsCompleted = (req, res) => {
  const { id } = req.params;

  const task = bd.findIndex((task) => task.id === parseInt(id));

  if (task !== -1) {
    bd[task].completed = true;
  }

  res.redirect("/");
};

const markAsUncompleted = (req, res) => {
  const { id } = req.params;
  const task = bd.findIndex((task) => task.id === parseInt(id));
  if (task !== -1) {
    bd[task].completed = false;
  }
  res.redirect("/");
};

export default {
  getAllTasks,
  getAddTaskForm,
  getEditTaskForm,
  addTask,
  editTask,
  deleteTask,
  markAsCompleted,
  markAsUncompleted,
};
