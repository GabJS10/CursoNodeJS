import { get } from "https";

const site = {
  hostname: "api.github.com",
  path: "/users/GabJS10",
  port: 443,
  method: "GET",
  headers: {
    "User-Agent": "request",
  },
};

get(site, (res) => {
  console.log(
    `El sitio ${site.hostname} tiene una respuesta de ${res.statusCode}, 
        Mensaje: ${res.statusMessage}`
  );

  res.setEncoding("utf8");
  //read data
  res.on("data", (chunk) => {
    console.log(JSON.parse(JSON.stringify(chunk)));
  });
}).on("error", (err) => {
  console.log(
    `El sitio ${site.hostname} tiene un error: ${err.message} Código: ${err.code}`
  );
});
