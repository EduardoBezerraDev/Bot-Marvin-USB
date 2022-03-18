const usetube = require('usetube')
const fs = require("fs");

import ytdl from "ytdl-core";

export const getYoutubeMp4 = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.body.toLowerCase().includes("baixarvideo")) {
      try {
        let video = message.body.substring(12)
        if (video.length > 3) {
          video = await usetube.searchVideo(video)
          if (video.videos == undefined || video.videos == null) {
            client.sendText(
              message.from,
              `*Erro ao baixar música. Tente outra*`
            );
            return false
          }
          video = `https://youtu.be/${video.videos[0].id}`
          const ytid: string = video;
          const { videoDetails: inf } = await ytdl.getInfo(ytid);
          const seconds = Number(inf.lengthSeconds);
          const path = `media/youtube/`;
          const archive = inf.videoId + ".mp4";
          if (seconds < 300) {
            client.sendFileFromUrl(
              message.from,
              `${inf.thumbnails[3].url}`,
              ``,
              `Título: *${inf.title}*\n` +
              `Canal: *${inf.ownerChannelName}*\n` +
              `entrou para o youtube em: *${inf.uploadDate}*\n` +
              `Quantidade de views: *${inf.viewCount}*\n\n`
            );

            client.sendText(
              message.from,
              `informações do vídeo:`
            );

            client.sendText(
              message.from,
              `*ATENÇÃO! AGUARDE* O VÍDEO está SENDO ENVIADO`
            );
            ytdl(video)
              .pipe(fs.createWriteStream(`${path}${archive}`))
              .on("finish", async () => {
                await client.sendText(message.from, `Pronto 😁 @${message.sender.pushname}\n o vídeo *${inf.title}* foi baixado`)

                client.sendFile(
                  message.from,
                  path + archive,
                  `${inf.title}.mp4`,
                  inf.title
                );

              })
              .on("error", async (error) => {
                console.log(error)
              })
          } else {
            client.sendText(
              message.from,
              `*ATENÇÃO! Não é permitido videos com duração acima de 5 minutos*`
            );
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  });
};
