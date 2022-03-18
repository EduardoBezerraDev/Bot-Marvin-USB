import Ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
const { parse } = require('rss-to-json');

export const getNotice = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.body.toLowerCase().includes("!noticias")) {
      (async () => {
        const rss = await parse('https://feeds.bbci.co.uk/portuguese/rss.xml');
        let notice = '*---------------------------------------* \n\n'
        rss.items.forEach(element => {

          const timestamp = element.published
          const date = new Date(timestamp);
          const dateFormated = date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()

          const title = element.title
          const description = element.description
          const link = element.link
          notice += `*${title}* \n\n`
          notice += `${description}\n\n`
          notice += `${dateFormated}\n\n`
          notice += `*Fonte:* ${link}\n\n`
          notice += `*---------------------------------------* \n\n\n`
        });

        let msg = `Ei, psiu! Aqui estão as *notícias mais recentes* \n\n`
        msg = `${msg}${notice}`
        await client.sendText(message.from, msg);
      })();
    }
  })
}