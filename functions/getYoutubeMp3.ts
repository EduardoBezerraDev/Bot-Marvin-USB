const usetube = require('usetube')
import Ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";

export const getYoutubeMp3 = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.body.toLowerCase().includes("baixarmusica")) {
      console.log(message.id)
      try {
        let music = message.body.substring(13)
        if (music.length > 3) {
          music = await usetube.searchVideo(music)
          if (music.videos == undefined || music.videos == null) {
            client.sendText(
              message.from,
              `*Erro ao baixar música. Tente outra*`
            );
            return false
          }
          music = `https://youtu.be/${music.videos[0].id}`
          const ytid: string = music;
          const { videoDetails: inf } = await ytdl.getInfo(ytid);
          const seconds = Number(inf.lengthSeconds);
          const time: number = seconds / 200;
          const timeFixed: number = Number(time.toFixed(0))
          const path = `media/youtube/`;
          const archive = inf.videoId + ".mp3";
          if (timeFixed < 5) {
            client.sendFileFromUrl(
              message.from,
              `${inf.thumbnails[3].url}`,
              ``,
              `Título: *${inf.title}*\n` +
              `Canal: *${inf.ownerChannelName}*\n` +
              `entrou para o youtube em: *${inf.uploadDate}*\n` +
              `Quantidade de views: *${inf.viewCount}*\n\n`
            );

            const stream = ytdl(ytid, {
              quality: "highestaudio",
            });

            client.sendText(
              message.from,
              `Estimativa de tempo para baixar: ${Number(timeFixed) >= 1
                ? "*Mais de um minuto*"
                : "*Menos de um minuto*\n"
              }   \ninformações do vídeo:`
            );

            client.sendText(
              message.from,
              `*ATENÇÃO! AGUARDE* O AUDIO está SENDO ENVIADO`
            );

            Ffmpeg({
              source: stream,
            })
              .setFfmpegPath("bin/ffmpeg.exe")
              .on("error", (err) => {
                client.sendText(
                  message.from,
                  `Desculpa, *houve um erro* ao baixar *${inf.title}*. Tente outra música`
                );

              })
              .on("end", async () => {
                await client.sendText(message.from, `Pronto 😁 @${message.from.substring(0, 12)}\n a música *${inf.title}* foi baixada para ${message.sender.pushname}`)

                client.sendFile(
                  message.from,
                  path + archive,
                  `${inf.title}.mp3`,
                  inf.title
                );

              })
              .saveToFile(path + archive);
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
