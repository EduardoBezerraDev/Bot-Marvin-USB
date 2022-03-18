export const getMenu = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      //Verifica se a mensagem é do tipo chat
      if (
        message.body.toLowerCase() === "!menu" ||
        message.body.toLowerCase() === "menu" ||
        message.body.toLowerCase() === "."
      ) {
        //Caso a mensagem digitada seja "!menu" dispara a lista de funcionalidades "Disparadas"
        const msg = `Bot *criado* por *Eduardo Bezerra:* wa.me/558599279231*\n` +
        `*Esse é o Menu aqui do grupo* 🙋\n` +
        `0 - Para buscar na wikipedia basta seguir o exemplo:\n !wikipedia pokemon\n\n` +
        `1 - Me envie um video, imagem ou gif com a legenda !fig que irei *transformar em figurinha* 😀\n\n` +
        `3 - Para ver as *Noticias recentes*. Basta seguir o exemplo: !noticias\n\n` +
        `4 - Quero jogar verdade ou desafio? basta utilizar !verdade para gerar uma pergunta aleatória ou !desafio\n\n` +
        `5 - Para *baixar video do tiktok* sem marca d'água. Basta compartilhar comigo o link\n\n` +
        `6 - Para *baixar música*. Basta seguir o exemplo:\nbaixarmusica artista-musica 🎵🎶\n\n` +
        `7 - Para *Gerar link do seu whatsapp* 📱. Basta enviar:\n!linkwhatsapp\n\n` +
        `8 - Para *Rolar um dado* 🎲. Basta enviar:\n!dadorpg 6 (6 é o número de faces do dado)\n\n` +
        `9 - *Informações de uma empresa/CNPJ*. Basta seguir o exemplo:\n!cnpj 13.347.016/0001-17\n\n` +
        `10 - Para *encurtar um link* 🔗 Basta seguir o exemplo:\n!encurtar google.com.br\n\n` +
        `11 - Para *transformar texto em áudio* 🎧. Basta seguir o exemplo:\n!textoparaaudio olá, como vai?\n\n` +
        `12 - Para *traduzir um texto* 🈹:\n\n*Para o ingles*: !traduzir:en + texto\n\n*Para o espanhol*: !traduzir:es + texto\n\n*Para o português*: !traduzir:pt + texto\n\n`
        
        await client.sendText(message.from, `Olá 😁 @${message.sender.pushname} esse é o menu:\n${msg}`)
      }
    }
  });
};
