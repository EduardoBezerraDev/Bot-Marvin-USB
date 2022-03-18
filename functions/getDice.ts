import axios from "axios";


export const getDice = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat") {
        const filtro = message.body.substring(9)
        const API_URL = `http://roll.diceapi.com/json/d${filtro}`
        if (message.body.toLowerCase().includes("!dadorpg")) {
          const response = await axios.get(API_URL)
          await client.sendText(message.from, `O resultado que saiu no dado foi: *${response.data.dice[0].value}*\nPara o usuário @${message.sender.pushname}`)
        }
      }
    } catch (error) {

    }
  });
};

export const getD20 = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat" && message.chat.isGroup) {
        const API_URL = `http://roll.diceapi.com/json/d20`
        if (message.body.toLowerCase().includes("!d20")) {
          const response = await axios.get(API_URL)
          await client.sendText(message.from, `O resultado que saiu no dado foi: *${response.data.dice[0].value}*\nPara o usuário *${message.sender.pushname}*`);
        }
      }
    } catch (error) {
      console.log(error)
    }
  });
};