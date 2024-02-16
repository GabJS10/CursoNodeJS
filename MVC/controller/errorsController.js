const error404 = (req, res) => {
  res
    .status(404)
    .render("error", { title: "Error 404", error: "Recurso no encontrado" });
};

export default {
  error404,
};
