import axios from "axios";

export const getShorter = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!encurtar") && message.chat.isGroup) {
        // Faz parte do Menu, envia o link do grupo caso a mensagem digitada seja "!encurtar"
        try {
          const long_url = message.body.substring(10);
          let url;

          if (!long_url.includes("http://") || !long_url.includes("https://")) {
            url = "http://" + long_url;
          }

          const data: string = JSON.stringify({
            long_url: url,
            domain: "bit.ly",
            title: url,
          });

          axios({
            method: "post",
            url: "https://api-ssl.bitly.com/v4/shorten",
            headers: {
              Authorization: "Bearer b1203b333ed4d1306e11283726d2969e762d8177",
              "Content-Type": "application/json",
            },
            data: data,
          })
            .then(async (response) => {
              const text = JSON.stringify(response.data.link)
                .replace('"', "")
                .replace('"', "");
              await client.sendText(message.from, `Pronto 😁 link encurtado para @${message.sender.pushname}`)
            })
            .catch(async (error) => {
              await client.sendText(
                message.from,
                `⚠ Não foi possível encurtar o link!`
              );
            });
        } catch (error) {
          console.log(error)
        }
      }
    }
  });
};
