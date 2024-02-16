import express from "express";
import { resolve } from "path";
const app = express();

app.get("/", (req, res) => {
  /*
  res.send("<h1>Hola Mundo con Express</h1>");
  console.log(res);
  console.log(req);
  */
  res.sendFile(resolve("index.html"));
});

app.get("/user/:id-:name-:age", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>${req.params.id} ${req.params.name} ${req.params.age}</h1>`);
});

app.get("/search", (req, res) => {
  //http://localhost:3000/search?id=1&name=Gabriel&age=25
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>${req.query.id} ${req.query.name} ${req.query.age}</h1>`);
});

//json
app.get("/json", (req, res) => {
  res.set({ "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ id: 1, name: "Gabriel", age: 25 }));
});

//files
app.get("/file", (req, res) => {
  res.sendFile(resolve("index.html"));
});
//templates engine
app.get("/template", (req, res) => {
  res.render("plantilla");
});
//redirects
app.get("/redirect", (req, res) => {
  res.redirect("https://pornhub.com");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
