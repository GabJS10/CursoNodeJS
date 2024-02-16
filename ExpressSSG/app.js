import express from "express";
import fs from "fs/promises";
import path from "path";
import markdownIt from "markdown-it";
import fm from "front-matter";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "pug");

const pageDir = path.join(__dirname, "pages");
const files = await fs.readdir(pageDir);

for (const file of files) {
  const filePath = path.join(pageDir, file);
  const extname = path.extname(filePath);

  if (extname === ".md" || extname === ".html" || extname === ".pug") {
    const filename = path.basename(filePath, extname);

    app.get(`/${filename}`, async (req, res) => {
      try {
        if (extname === ".pug") {
          res.render(filename);
        }

        if (extname === ".html") {
          res.sendFile(filePath);
        }

        if (extname === ".md") {
          const content = await fs.readFile(filePath, "utf-8");
          const { body, attributes } = fm(content);
          const html = new markdownIt().render(body);
          res.render("layout-md", { ...attributes, html });
        }
      } catch (error) {
        res.status(404).render("error404");
      }
    });
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.status(404).render("error404");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
