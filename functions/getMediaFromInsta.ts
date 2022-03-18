import { createLog } from "../utils/createLog";
const instagram_download = require("@juliendu11/instagram-downloader");

export const getMediaFromInsta = (client) => {
  client.onMessage(async (message) => {
    if (
      message.type === "chat" &&
      !message.chat.isGroup &&
      message.body.includes("https://www.instagram.com")
    ) {
      try {
        const url = message.body.split("?utm_medium=share_sheet");
        let code = message.body.split("https://www.instagram.com/p/");
        const path = `media/instagram/`;
        code = code[1].split("/");
        const archive = code[0] + ".jpg";

        (async () => {
          try {
            const value = await instagram_download.downloadMedia(url[0], path);
            await client.sendFile(
              message.from,
              path + archive,
              archive,
              "Baixado do instagram utilizando o bot-x9 😁"
            );
            createLog({
              action: "getMediaFromInsta",
              error: false,
              error_description: "",
              whatsapp: message.author,
            });
          } catch (error) {
            console.log(error)
          }
        })();
      } catch (error) {
        createLog({
          action: "getMediaFromInsta",
          error: true,
          error_description: error,
          whatsapp: message.author,
        });
      }
    }
  });
};
