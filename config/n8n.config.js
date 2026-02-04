module.exports = {
  guilds: {
    [process.env.GUILD_ID]: {
      channels: {
        [process.env.CHANNEL_ID_SUP]: {
          name: "suporte",
          webhookUrl: process.env.URL_AGENTE_SUP,
          authorization: process.env.PASS_AGENTE_SUP
        },
        [process.env.CHANNEL_ID_MARK]: {
          name: "marketing",
          webhookUrl: process.env.URL_AGENTE_MARK,
          authorization: process.env.PASS_AGENTE_MARK
        }
      }
    }
  }
};
