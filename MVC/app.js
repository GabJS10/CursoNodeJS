import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import taskController from "./controller/taskController.js";
import errorsControler from "./controller/errorsController.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", taskController.getAllTasks);
app.get("/add", taskController.getAddTaskForm);
app.get("/edit/:id", taskController.getEditTaskForm);
app.post("/add", taskController.addTask);
app.post("/edit/:id", taskController.editTask);
app.get("/delete/:id", taskController.deleteTask);
app.get("/complete/:id", taskController.markAsCompleted);
app.get("/uncomplete/:id", taskController.markAsUncompleted);

app.use(errorsControler.error404);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
