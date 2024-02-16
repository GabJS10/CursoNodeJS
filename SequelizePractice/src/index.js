import app from "../src/app.js";
import { sequelize } from "./database/database.js";
//import "../src/models/projects.js";
//import "../src/models/tasks.js";
async function main(params) {
  app.listen(3000, () => console.log("Server conected port 3000"));

  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
