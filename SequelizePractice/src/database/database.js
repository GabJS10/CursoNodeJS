import Sequelize from "sequelize";

export const sequelize = new Sequelize("PracticaDB", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});
