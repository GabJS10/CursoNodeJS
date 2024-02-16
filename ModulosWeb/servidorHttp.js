import { createServer } from "http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Hola Mundo con Node</h1>");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor corriendo en http://127.0.0.1:3000");
});
