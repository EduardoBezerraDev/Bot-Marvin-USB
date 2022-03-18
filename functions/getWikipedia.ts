import axios from "axios";
import {
  createLog
} from "../utils/createLog";

export const getWikipedia = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat") {
        const filtro = message.body.substring(11).replace(/\s/g, '_')
        const API_URL = `https://pt.wikipedia.org/api/rest_v1/page/summary/${filtro}`
        if (message.body.toLowerCase().includes("!wikipedia")) {
          const response = await axios.get(API_URL)
          
          client.sendText(message.from, `Pronto 😁 Busca feita sobre *${filtro}* para @${message.sender.pushname}\n\n*${filtro}*\n${response.data.extract}`)

          createLog({
            action: "getTextToAudio",
            error: false,
            error_description: "",
            whatsapp: message.author,
          });
        }
      }
    } catch (error) {
      createLog({
        action: "getWikipedia",
        error: true,
        error_description: error,
        whatsapp: message.author,
      });
    }
  });
};