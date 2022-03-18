import translate from "translate-google";

export const getTranslate = (client) => {
  client.onMessage(async (message) => {
    try {
      if (message.type === "chat") {
        if (message.body.length > 13) {
          const msg = message.body;
          const languageSelected = msg.substring(0, 12);
          const text = msg.substring(12);
          let language: string;
          if (
            languageSelected === "!traduzir:pt" ||
            languageSelected === "!traduzir:en" ||
            languageSelected === "!traduzir:es"
          ) {
            switch (languageSelected) {
              case "!traduzir:pt":
                language = "pt"
                break;
              case "!traduzir:en":
                language = "en"
                break;
              case "!traduzir:es":
                language = "es"
                break;
              default:
                break;
            }
            translate(text, { to: language }).then(translated => {
              client.sendText(message.from, `Pronto 😁 tradução feita para @${message.sender.pushname}\nTradução: ${translated}`)

            }).catch(error => {
              console.log(error)
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}