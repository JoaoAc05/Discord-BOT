const { sendMessageToN8n } = require('../services/n8n.service');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (!message.guild) return;

    const args = message.content.trim().split(/\s+/);
    const comando = args.shift()?.toLowerCase();

    if (comando === 'avatar') {
      await message.channel.send(
        message.author.displayAvatarURL({ extension: 'webp', size: 256 })
      );
      return;
    }

    if (comando === 'ping') {
      try {
        const m = await message.channel.send('Pong!');
        await m.edit(
          `Latência do bot é: ${m.createdTimestamp - message.createdTimestamp}ms`
        );
      } catch (error) {
        console.log(`Erro no comando ping: ${error.message}`);
        await message.channel.send(
          'Ocorreu um erro ao verificar a atividade do bot.'
        );
      }
      return;
    }

    const success = await sendMessageToN8n({
      guildId: message.guild.id,
      channelId: message.channel.id,
      message: message.content,
      sessionId: message.author.id,
      author: message.member?.displayName || message.author.username,
    });
    
    if (!success) {
        console.log(`Mensagem ignorada: ${message.content}`);
    }

  });
};
