import cep from 'cep-promise'

export const getCep = (client) => {
    client.onMessage(async (message) => {
        if (message.body.toLowerCase().includes("!cep")) {
            const filtro = message.body.substring(5)
            cep(filtro).then(async response => {
                const msg = `Estado: *${response.data.state}*` +
                    `Cidade: *${response.data.city}*` +
                    `Rua: *${response.data.street}*` +
                    `Bairro: *${response.data.neighborhood}*`
                await client.sendText(message.from, `Busca feita do cep *${filtro}* para *${message.sender.pushname}*\n\n*${filtro}*\n${msg}`);
            })
        }
    })
}
