import { createServer } from "http";

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Home</h1>");
  } else if (req.url === "/hello") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Hello</h1>");
  } else if (req.url === "/bye") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Bye</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Not Found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor corriendo en http://127.0.0.1:3000");
});
