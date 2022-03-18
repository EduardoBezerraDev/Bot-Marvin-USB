import { create, Client, decryptMedia } from '@open-wa/wa-automate';
import mime from "mime-types";

export const getDeletedMessage = (client) => {
  client.onMessageDeleted(async (message) => {
    if (typeof message.author !== "undefined") {
      if (message.type === "image") {
        //Verifica se a mensagem apagada foi uma imagem
        const filename = `${message.t}.${mime.extension(message.mimetype)}`; //atribui um nome ao arquivo apagado
        const mediaData = await decryptMedia(message); //descriptografa a imagem, convertendo para base64
        await client.sendImage(
          message.from,
          `data:${message.mimetype};base64,${mediaData.toString("base64")}`,
          filename,
          `@${message.author.replace("@c.us", "")} Apagou essa imagem 🧐`
        );
      }
      if (message.type === "audio") {
        //Verifica se a mensagem apagada foi um áudio
        const filename = `${message.t}.${mime.extension(message.mimetype)}`; //atribui um nome ao arquivo apagado
        const mediaData = await decryptMedia(message); //descriptografa o áudio, convertendo para base64
        await client.sendText(
          message.from,
          `@${message.author.replace(
            "@c.us",
            ""
          )} Apagou o seguinte áudio enviado:🧐`
        );
        await client.sendAudio(
          message.from,
          `data:${message.mimetype};base64,${mediaData.toString("base64")}`,
          filename
        );
      }
      if (message.type === "ptt") {
        //Verifica se a mensagem apagada foi um áudio gravado
        const filename = `${message.t}.${mime.extension(message.mimetype)}`; //atribui um nome ao arquivo apagado
        const mediaData = await decryptMedia(message); //descriptografa o audio gravado, denominado como PTT, convertendo para base64
        await client.sendText(
          message.from,
          `@${message.author.replace(
            "@c.us",
            ""
          )} Apagou o seguinte áudio gravado:🧐`
        );
        await client.sendPtt(
          message.from,
          `data:${message.mimetype};base64,${mediaData.toString("base64")}`,
          filename
        );
      }
      if (message.type === "chat") {
        //Verifica se a mensagem apagada apenas texto
        await client.sendText(
          message.from,
          `@${message.author.replace(
            "@c.us",
            ""
          )} Apagou a seguinte mensagem:\n *${message.body}*  🧐`
        );
      }
      if (message.type === "document" || message.type === "video") {
        //Verifica se a mensagem apagada uma imagem ou vídeo
        const filename = `${message.t}.${mime.extension(message.mimetype)}`; //atribui um nome ao arquivo apagado
        const mediaData = await decryptMedia(message); //descriptografa o documento ou vídeo, convertendo para base64
        if (message.type === "video") {
          await client.sendText(
            message.from,
            `@${message.author.replace("@c.us", "")} apagou o seguinte vídeo 🧐`
          );
        } else {
          await client.sendText(
            message.from,
            `@${message.author.replace(
              "@c.us",
              ""
            )} Apagou o seguinte arquivo 🧐`
          );
        }
        await client.sendFile(
          message.from,
          `data:${message.mimetype};base64,${mediaData.toString("base64")}`,
          filename
        );
      }
      if (message.type === "sticker") {
        //Verifica se a mensagem apagada foi uma figurinha/sticker
        const mediaData = await decryptMedia(message);
        await client.sendText(
          message.from,
          `@${message.author.replace(
            "@c.us",
            ""
          )} Apagou a seguinte figurinha 🧐`
        );
        await client.sendImageAsSticker(message.from, mediaData);
      }
    }
  });
};
