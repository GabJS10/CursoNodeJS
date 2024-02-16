import fs from "fs";
import path from "path";
import sharp from "sharp";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, "origin");

const size = 1920;

const convertir = async function (file) {
  const fileName = path.basename(file, path.extname(file));
  const fileExtension = path.extname(file);
  const pathFileName = path.join(directoryPath, file);
  const pathFileNameOpt = path.join(
    __dirname,
    `optimized/${fileName}-${size}${fileExtension}`
  );

  await sharp(pathFileName).resize(size).toFile(pathFileNameOpt);

  await imagemin([pathFileNameOpt], {
    destination: path.join(__dirname, "optimized"),
    plugins: [
      imageminWebp({ quality: 80 }),
      imageminGifsicle(),
      imageminJpegtran(),
      imageminPngquant({ quality: 80 }),
      imageminSvgo(),
    ],
  });
};

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("No fue posible leer el directorio: " + err);
  }

  files.forEach(convertir);

  console.log("Optimizado");
});
