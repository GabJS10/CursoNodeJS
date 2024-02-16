//import readline
import { createInterface } from "readline";
import chalk from "chalk";

//createInterface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data = [];

//readline
function presentation() {
  console.log(chalk.blue.bold(`Hola bienvenido a el CLI Todo App`));
  console.log(chalk.green(`Opciones: `));
  console.log("1. Crear una nueva tarea");
  console.log("2. Ver todas las tareas");
  console.log("3. Ver una tarea");
  console.log("4. Eliminar una tarea");
  console.log("5. Editar una tarea");
  console.log("6. Marcar una tarea como completada");
  console.log("7. Salir");
}

function addTask(name = "", description = "") {
  if (name.trim().length <= 0 || description.trim().length <= 0) {
    console.log(chalk.red("Rellene todos los campos"));
    return;
  }

  data = [
    ...data,
    {
      id: data[data.length - 1]?.id + 1 || 1,
      name,
      description,
      completed: false,
    },
  ];
}

function markAsCompleted(id) {
  data = data.map((task) => {
    if (task.id === parseInt(id)) {
      task.completed = true;
    }
    return task;
  });
}

function editTask(id, name = "", description = "") {
  data = data.map((task) => {
    if (task.id === parseInt(id)) {
      if (name.trim().length > 0) task.name = name;

      if (description.trim().length > 0) task.description = description;
    }
    return task;
  });
}

function deleteTask(id) {
  if (data.length <= 0) {
    console.log(chalk.red("No hay tareas"));
    return;
  }

  data = data.filter((task) => task.id !== parseInt(id));

  console.log(chalk.red(`Tarea eliminada`));
}

function viewTask(id) {
  const task = data.find((task) => task.id === parseInt(id));

  if (!task) {
    console.log(chalk.red(`Tarea ${id} no encontrada`));
    return;
  }

  console.log(`Name: ${task.name} - Description: ${task.description}`);
  console.log(`Completed: ${task.completed}`);
}

function viewAll() {
  if (data.length <= 0) {
    console.log(chalk.red("No hay tareas"));
    return;
  }

  data.forEach((task) => {
    console.log(chalk.green.bold(`Tarea ${task.id}`));
    console.log(`Name: ${task.name} - Completed: ${task.completed}`);
  });
}

function principal() {
  rl.question("Que deseas hacer: ", (answer) => {
    switch (answer) {
      case "1":
        rl.question("Name: ", (name) => {
          rl.question("Description: ", (description) => {
            addTask(name, description);
            presentation();
            principal();
          });
        });
        break;
      case "2":
        viewAll();
        presentation();
        principal();
        break;
      case "3":
        rl.question("Id: ", (id) => {
          viewTask(id);
          presentation();
          principal();
        });
        break;
      case "4":
        rl.question("Id: ", (id) => {
          deleteTask(id);
          presentation();
          principal();
        });
        break;
      case "5":
        rl.question("Id: ", (id) => {
          rl.question("Name: ", (name) => {
            rl.question("Description: ", (description) => {
              editTask(id, name, description);
              presentation();
              principal();
            });
          });
        });
        break;

      case "6":
        rl.question("Id: ", (id) => {
          markAsCompleted(id);
          presentation();
          principal();
        });
        break;

      case "7":
        console.log("Saliendo");
        rl.close();
        break;
      default:
        console.log("Opcion no valida");
        presentation();
        principal();
        break;
    }
  });
}

presentation();
principal();
