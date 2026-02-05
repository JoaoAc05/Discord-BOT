module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: `Comando não encontrado.`,
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
        console.log(`Erro ao executar comando: ${error.message}`);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'Ocorreu um erro ao executar o comando.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'Ocorreu um erro ao executar o comando.',
          ephemeral: true,
        });
      }
    }
  });
};
