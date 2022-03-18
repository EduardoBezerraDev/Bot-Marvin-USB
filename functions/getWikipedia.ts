import axios from "axios";


export const getWikipedia = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat") {
        const filtro = message.body.substring(11).replace(/\s/g, '_')
        const API_URL = `https://pt.wikipedia.org/api/rest_v1/page/summary/${filtro}`
        if (message.body.toLowerCase().includes("!wikipedia")) {
          const response = await axios.get(API_URL)

          client.sendText(message.from, `Pronto 😁 Busca feita sobre *${filtro}* para @${message.sender.pushname}\n\n*${filtro}*\n${response.data.extract}`)

        }
      }
    } catch (error) {
      console.log(error)
    }
  });
};