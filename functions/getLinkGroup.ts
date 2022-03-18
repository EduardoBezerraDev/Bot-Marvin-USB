import { createLog } from "../utils/createLog";

export const getLinkGroup = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.chat.isGroup) {
      if (message.body.toLowerCase() === "!l") {
        // Faz parte do Menu, envia o link do grupo caso a mensagem digitada seja "!L"
        try {
          await client.sendText(
            "Para utilizar esse recurso preciso ser administrador 🙋‍♂️"
          );
          client.getGroupInviteLink(message.from).then(async (resposta) => {
             await client.sendText(message.from, `Pronto! @${message.sender.pushname}\nAqui está o link do grupo:\n${resposta}`)

            createLog({
              action: "getLinkGroup",
              error: false,
              error_description: '',
              whatsapp: message.author,
            });
          });
        } catch (error) {
          const obj = {
            actions: [],
          };
          createLog({
            action: "getLinkGroup",
            error: true,
            error_description: error,
            whatsapp: message.author,
          });
        }
      }
    }
  });
};
