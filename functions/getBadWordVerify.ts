const badWords = [
  "porra",
  "porra.",
  "pqp",
  "pqp.",
  "caralho",
  "caralho.",
  "cu",
  "cu.",
  "xota",
  "xota.",
  "priquito",
  "priquito.",
  "piroca",
  "piroca.",
  "rola",
  "rola.",
  "puta",
  "puta.",
  "rapariga",
  "rapariga.",
];
export const getBadWordVerify = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && message.chat.isGroup) {
      let user: any;
      let isBadWord: boolean;
      let sender: any;
      const arrayMsg = message.body.split(" "); //A cada mensagem de um integrante do grupo o bot  transforma em um ARRAY
      arrayMsg.forEach((wordOfMsg: string) => {
        //Percorre o ARRAY de palavras da frase
        badWords.forEach((element) => {
          // Percorre o array de palavrões
          const word = wordOfMsg.toLowerCase();
          if (word == element) {
            //Verifica se alguma palavra consta na lista de palavrões e colhe as informações do integrante(Sender)
            sender = message.sender.id;
            user = message.from;
            isBadWord = true;
          }
        });
      });
      if (isBadWord === true) {
        //Emite uma mensagem alertando que um integrante digitou um palavrão
        await client.sendTextWithMentions(
          user,
          `@${sender} Digitou um palavrão. Por favor, acalme-se 😅. Caso continue os administradores tomarão as providências. 🤨 `
        );
      }
    }
  });
};
