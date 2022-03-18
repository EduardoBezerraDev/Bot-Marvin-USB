const tiktok = require('tiktok-scraper-without-watermark')

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

        }).catch(error => { console.log(error) })
    }
  });
};
