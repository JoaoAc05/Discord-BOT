const { REST, Routes } = require('discord.js');
const config = require('./config.json');

const rest = new REST().setToken(config.token);


// for guild-based commands                                  \\ID Servidor          \\ID Comando
rest.delete(Routes.applicationGuildCommand(config.client_id, config.guild_id, '1240317742632927370'))
	.then(() => console.log('Comando Deletado do Servidor Com Sucesso!'))
	.catch(console.error);