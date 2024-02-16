import { Projects } from "../models/projects.js";
import { Tasks } from "../models/tasks.js";
const getProjects = async (req, res) => {
  const projects = await Projects.findAll();
  res.json(projects);
};

const getTasksByProject = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findAll({
      where: {
        projectId: id,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postProjects = async (req, res) => {
  const { priority, name, description } = req.body;
  if (!priority || !name || !description) {
    res
      .status(400)
      .json({ error: "Priority and name and description are required" });
  }
  const newProject = await Projects.create({ priority, name, description });
  res.json(newProject);
};

const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Projects.findOne({
    where: {
      id,
    },
  });
  res.json(project ? project : { error: "Project not found" });
};

const putProject = async (req, res) => {
  const { id } = req.params;
  const { priority, name, description } = req.body;

  if (!priority || !name || !description) {
    res
      .status(400)
      .json({ error: "Priority and name and description are required" });
  }

  await Projects.update(
    { priority, name, description },
    {
      where: {
        id,
      },
    }
  );
  res.json({ message: "Project updated" });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  await Projects.destroy({
    where: {
      id,
    },
  });
  res.status(204).json({ message: "Project deleted" });
};

export {
  getTasksByProject,
  getProjects,
  postProjects,
  getProject,
  putProject,
  deleteProject,
};
