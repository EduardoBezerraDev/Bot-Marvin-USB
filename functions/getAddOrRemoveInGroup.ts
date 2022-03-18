export const getAddOrRemoveInGroup = (client) =>
  client.onGlobalParticipantsChanged(async (participantChangedEvent) => {
    if (participantChangedEvent.who !== "14696723876@c.us") {
      //Verifica se um novo integrante foi adicionado ou removido de um grupo, e também se o número adicionado é diferente do utilizado para o bot
      switch (participantChangedEvent.action) {
        case "remove":
          await client.sendText(
            //Verifica se o novo integrante foi removido, caso sim retorna uma mensagem
            participantChangedEvent.chat,
            `Poxa! 🖐 *@${participantChangedEvent.who}*, foi bom enquanto durou. espero que volte algum dia! 😁.`
          );
          break;
        case "add":
          if (participantChangedEvent.by === "invite") {
            //Verifica se o novo integrante foi convidado por link, caso sim retorna uma mensagem
            await client.sendText(
              participantChangedEvent.chat,
              `Seja bem vindo *@${participantChangedEvent.who}*. Que legal! Você foi convidado por algúem. Você pode nos contar quem foi?\nLeia a descrição do grupo 👁😃 para ficar por dentro das regras\nDIGITE *!MENU* PARA VER O *MENU DO QUE O ROBÔ PODE FAZER*`
            );
          } else {
            await client.sendText(
              //Verifica se o novo integrante foi adicionado por outro integrante, caso sim retorna uma mensagem
              participantChangedEvent.chat,
              `Seja bem vindo *@${participantChangedEvent.who}*. Leia a descrição do grupo 👁😃 para ficar por dentro das regras\nDIGITE *!MENU* PARA VER O *MENU DO QUE O ROBÔ PODE FAZER* `
            );
          }
          break;
      }
    }
  });
