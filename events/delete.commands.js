const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST().setToken(process.env.DISCORD_TOKEN);


// for guild-based commands                                  \\ID Servidor          \\ID Comando
rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, '1240317742632927370'))
	.then(() => console.log('Comando Deletado do Servidor Com Sucesso!'))
	.catch(console.error);