const axios = require("axios");

export const getContacts = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!informarparatodos")) {
        try {
          //const response = await axios.get('http://gestforce.com.br:4003/user')
          const text = message.body.substring(19);
          await client.sendText("558592449519@c.us", text);
          console.log('ENVIADO')
        } catch (error) {
          console.log(error)
        }
      }
    }
  });
};
