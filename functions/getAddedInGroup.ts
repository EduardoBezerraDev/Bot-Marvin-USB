// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getAddedInGroup(client) {
  client.onAddedToGroup(async (message) => {
    //Ao ser adicionado em um grupo dispara uma frase
    await client.sendText(
      message.id,
      `Obrigado por me adicionar ao grupo *${message.formattedTitle.toUpperCase()}* 😁😎\n
      terei que sair infelizmente *Caso não tenha obtido permissão através do grupo:*\n\n
      https://chat.whatsapp.com/C2AFTiJYFDf22QkZpjy0rT\n\n
      😞
      `
    );
  });
}
