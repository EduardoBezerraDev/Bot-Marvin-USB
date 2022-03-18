import {decryptMedia } from '@open-wa/wa-automate';

import { createLog } from "../utils/createLog";
const fs = require("fs");
export const getConvertToStick = (client) => {
  client.onMessage(async (message) => {
    try {
        if (message.mimetype) {
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
          const metadata = { author: 'bot x9', pack: 'bot x9 figurinhas', keepScale: true, square: '512'}
          let isStick = false;
          if (message.type === "image" && message.text == "!fig") {
            console.log(message.id)
            //Verifica se o que foi enviado foi uma imagem. Caso sim, converte para uma figurinha
            client
              .sendImageAsSticker(message.from, imageBase64, metadata)
              .then(async () => {
                
                client.sendText(message.from, `Pronto 😁 figurinha criada para @${message.sender.pushname}`)
              });
            isStick = true;
          }
          if (message.type === "video" && message.text == "!fig") {
            //Verifica se o que foi enviado foi um vídeo. Caso sim, converte para uma figurinha animada
                 await client.sendMp4AsSticker(message.from, mediaData, metadata);
                 await client.sendText(message.from, `Pronto! @${message.from.substring(0, 12)}\nfigurinha feita!`)
            isStick = true;
          }
          if (isStick === true) {
            createLog({
              action: "getConvertToStick",
              error: false,
              error_description: "",
              whatsapp: message.author,
            });
          }
        }
      } catch (error) {
        createLog({
          action: "getConvertToStick",
          error: true,
          error_description: error,
          whatsapp: message.author,
        });
      }
  });
};
