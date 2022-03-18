const waMe = require("wa-me-generator");
export const getWhatsappLink = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat"  && message.body.toLowerCase().includes("!linkwhatsapp")) {
      const link = waMe.createFromNumberWithMessage(message.author.replace("@c.us", ""), message.body.substring(14));
      client.sendText(message.from, `Pronto 😁 @${message.sender.pushname}\nCom esse link as pessoas não precisam adicionar seu número`)
      await client.sendText(message.from, link);
    }
  });
};
