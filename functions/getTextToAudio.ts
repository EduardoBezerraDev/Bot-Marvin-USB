const googleTTS = require("google-tts-api"); // CommonJS
import mime from "mime-types";

export const getTextToAudio = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!textoparaaudio")) {
        if (message.body.substring(15).length > 1) {
          try {
            const results = googleTTS
              .getAllAudioBase64(message.body.substring(15), {
                lang: "pt",
                slow: false,
                host: "https://translate.google.com",
                splitPunct: ",.?",
              })
              .then((base64) => {
                base64.forEach(async (element) => {
                  const filename = `${message.t}.${mime.extension(
                    message.mimetype
                  )}`;
                  await client.sendPtt(
                    message.from,
                    `data:${message.mimetype};base64,${element.base64}`,
                    filename
                  );
                  await client.sendText(message.from, `Pronto 😁 @${message.sender.pushname}\n texto convertido para áudio`)

                });

              });
          } catch (error) {
            console.log(error)
          }
        }

      }
    }
  });
};
