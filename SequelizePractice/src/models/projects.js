import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Tasks } from "./tasks.js";
export const Projects = sequelize.define(
  "projects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Projects.hasMany(Tasks, {
  foreignKey: "projectId",
  sourceKey: "id",
});

Tasks.belongsTo(Projects, {
  foreignKey: "projectId",
  targetKey: "id",
});
