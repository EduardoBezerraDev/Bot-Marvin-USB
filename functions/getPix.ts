const { PIX } = require('gpix/dist');

export const getPix = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!pix")) {
        try{
          let name = ""
          let key = ""
          let value = 0
          var txt = message.body;
          var regExp = /\(([^)]+)\)/g;
          var matches = txt.match(regExp);
          for (var i = 0; i < matches.length; i++) {
              if(i == 2){
                name = matches[i].substring(1, matches[i].length - 1)
              }
              if(i == 1){
                key = matches[i].substring(1, matches[i].length - 1)
              }
              if(i == 0){
                value = Number(matches[i].substring(1, matches[i].length - 1))
              }
          }
         
          let pix = PIX.static()
              .setReceiverName(name)
              .setKey(key)
              .isUniqueTransaction(true) // optional
              .setAmount(value) // optional
              
              await client.sendText(message.from, `Código pix gerado para *${message.sender.pushname}* abaixo:`);
              await client.sendText(message.from, pix.getBRCode());
              if(await pix.saveQRCodeFile("media/pix/pix.jpg")) {
                client.sendButtons(message.from, "Menu teste", ["botao1", "botao2", "botao3"], "Titulo", "footer")
            } else {
                console.log('erro ao salvar qr-code')
            }
            }catch(error){
        }
      }
    }
  })
}