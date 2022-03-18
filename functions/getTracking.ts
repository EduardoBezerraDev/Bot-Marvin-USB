import rastreio from "rastrearpedidos";

export const getTracking = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat" && !message.chat.isGroup) {
      if (message.body.toLowerCase().includes("!r")) {
        try {
          rastreio(message.body.substring(3)).then(
            async (order) =>
              await client.sendText(
                message.from,
                `*Dados dessa encomenda*` +
                `Ultima atualização: *${order[0].dataHora}*\n` +
                `Status do pedido: *${order[0].descricao}*\n` +
                `Cidade: *${order[0].cidade}*\n` +
                `UF: *${order[0].uf}*`
              )
          );

        } catch (error) {
          await client.sendText(
            message.from,
            `Codigo *${message.body}* é inválido. Por favor, verifique seu código)`
          );
        }
      }
    }
  });
};
