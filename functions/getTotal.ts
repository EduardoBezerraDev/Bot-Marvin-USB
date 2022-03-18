import axios from "axios";


export const getTotal = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat") {
        const API_URL = `http://gestforce.com.br:4003/access/accessAll`
        if (message.body.toLowerCase().includes("!acessos")) {
          const response = await axios.get(API_URL)
          const msg = `*Quantidade de acessos esse mês:* ${response.data[0].month}\n*`
          await client.sendText(message.from, msg);
        }
      }
    } catch (error) {
     console.log(error)
    }
  });
};