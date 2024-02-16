import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import taskController from "./controller/taskController.js";
import errorsControler from "./controller/errorsController.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/tasks", taskController.getAllTasks);
app.get("/tasks/:id", taskController.getOneTask);
app.post("/tasks", taskController.addTask);
app.put("/tasks/:id", taskController.editTask);
app.delete("/tasks/:id", taskController.deleteTask);
app.put("/tasks/completed/:id", taskController.markAsCompleted);
app.put("/tasks/uncompleted/:id", taskController.markAsUncompleted);

app.use(errorsControler.error404);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/tasks`);
});
