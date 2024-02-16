//refactoring for rest api
const error404 = (req, res) => {
  res.status(404).json({ error: "Recurso no encontrado", code: 404 });
};
export default {
  error404,
};
