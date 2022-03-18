export const getCallVerification = (client) => {
  client.onIncomingCall(async (call) => {
    // ketika seseorang menelpon nomor bot
    if (!call.isGroup) {
      await client
        .sendText(call.peerJid, `⛔ Você foi bloqueado. Para evitar incômodo.`)
        .then(async () => {
          client.contactBlock(call.peerJid);
        });
    }
  });
};
