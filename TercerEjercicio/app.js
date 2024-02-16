import axios from "axios";
import chalk from "chalk";

const API_KEY = "eddcc2306e8fdd912cd4b12a0ab8e210";

const getWeather = async (city) => {
  const resp = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    }
  );

  return resp.data;
};
function initApp() {
  const city = process.argv[2];

  if (!city) {
    console.log(chalk.red("Debes introducir una ciudad"));
    return;
  }

  getWeather(city)
    .then((data) => {
      console.log(chalk.green(data.name));
      console.log(chalk.green(`Temperatura: ${data.main.temp}`));
      console.log(chalk.green(`Temperatura máxima: ${data.main.temp_max}`));
      console.log(chalk.green(`Temperatura mínima: ${data.main.temp_min}`));
      console.log(chalk.green(`Humedad: ${data.main.humidity}`));
      console.log(chalk.green(`Vientos: ${data.wind.speed}`));
    })
    .catch((error) => {
      console.log(chalk.red(error.response.data.message));
    });
}

initApp();
