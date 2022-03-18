import axios from "axios";
import unixTime from "../utils/unixTime";


export const getWeather = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!tempo")) {
        const API_URL = "http://api.weatherapi.com/v1/forecast.json?"
        const API_KEY = "bc16b34315b94125adc110957211810";

        let text = message.body.substring(7);
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        const LOCATION = text
        const LANG = "pt";
        const FULL_API_URL = `${API_URL}key=${API_KEY}&q=${LOCATION}&days=1&aqi=no&alerts=no&lang=${LANG}`;
        axios
          .get(FULL_API_URL)
          .then(async (response) => {
            const city = response.data.location.name
            const state = response.data.location.region
            const cityRegion = `${city} - ${state}`
            const condition = response.data.current.condition.text;

            axios
              .get(`https://weather.contrateumdev.com.br/api/weather/city/?city=${LOCATION}`)
              .then(async function (response) {
                try {
                  const temp_min = response.data.main.temp_min;
                  const temp_max = response.data.main.temp_max;
                  const feels_like = response.data.main.feels_like;
                  const temperaturaAtual = response.data.main.temp;
                  const humidity = response.data.main.humidity;
                  const wind = response.data.wind.speed;
                  const cloud = response.data.clouds.all;
                  const pressure = response.data.main.pressure;
                  const dt = unixTime(response.data.dt);

                  // Construindo a frase para ser enviado
                  const weatherDisplay =
                    `📍 Local: ${cityRegion}\n\n` +
                    `⛅ Condição Atual: ${condition}\n\n` +
                    `🌡 Temperatura: ${temperaturaAtual.toFixed(1)}ºC\n` +
                    `🔅 Sensação Térmica: ${feels_like.toFixed(1)}ºC\n` +
                    `❄️ Mínima: ${temp_min.toFixed(1)}ºC\n` +
                    `🔥 Máxima: ${temp_max.toFixed(1)}ºC\n` +
                    `🎈 Pressão: ${pressure} hPa\n` +
                    `💦 Umidade: ${humidity}%\n` +
                    `🌬 Vento: ${wind.toFixed(1)}Km/h\n` +
                    `☁️ Cobertura de Nuvens: ${cloud}%\n\n` +
                    `🚦 Última atualização: ${dt}`;

                  await client.sendText(message.from, `Poxa! @${message.sender.pushname}\nCidade não encontrada`)

                } catch (error) {
                  await client.sendText(message.from, `Poxa! @${message.sender.pushname}\nCidade não encontrada`)
                }
              });
          })
      }
    }
  });
};