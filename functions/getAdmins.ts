export const getAdmins = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.chat.isGroup) {
      if (message.body.toLowerCase() === "!a") {
        //Faz parte do menu, chama atenção de todos os administradores caso a mensagem digitada seja "!A"
        try {
          client.getGroupAdmins(message.from).then(async (admins) => {
            await client.sendText(message.from, "Marcando administradores:");
            admins.forEach(async (admin) => {
              await client.sendText(message.from, `@+${admin.slice(0, -5)}`);
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};
