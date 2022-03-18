const tiktok = require('tiktok-scraper-without-watermark')
import { createLog } from "../utils/createLog";

export const getTiktokVideo = (client) => {
  client.onMessage(async (message) => {
    if (
      message.type === "chat" &&
      message.body.toLowerCase().includes("https://vm.tiktok.com")) {
      const url = message.body
      tiktok.tiktokdownload(url)
        .then(async result => {
          await client.sendText(message.from, `Pronto 😁 @${message.sender.pushname} esse é o link para o video do tiktok`)
          client.sendText(message.from, result.nowm)
          client.sendText(message.from, "Após *tocar no link* e *abrir o video*, *pressione no video* e *toque em 'baixar video'*")
          createLog({
            action: "getTiktokVideo",
            error: false,
            error_description: '',
            whatsapp: message.author,
          })
        }).catch(error => createLog({
          action: "getTiktokVideo",
          error: true,
          error_description: error,
          whatsapp: message.author,
        }))
    }
  });
};
