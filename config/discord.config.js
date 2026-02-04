const { GatewayIntentBits, Partials, ActivityType } = require('discord.js');

module.exports = {
  client: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],

    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
    ],
  },

  presence: {
    status: 'online',
    activities: [
      {
        name: 'RuralHub.com.br',
        type: ActivityType.Listening,
      },
    ],
  },

  permissions: {
    required: [
      'ViewChannel',
      'SendMessages',
      'ReadMessageHistory',
    ],
  },
};
