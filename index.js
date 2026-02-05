require('dotenv').config();
const { Client, Collection } = require('discord.js');
const discordConfig = require('./config/discord.config');
const comandosJson = require("./Comandos.json");
const client = new Client(discordConfig.client);
const logger = require('./utils/logger.utils');

client.once("ready", () => {
    console.log(`Discord-Bot foi iniciado em ${client.guilds.cache.size} servidores.`);
    client.user.setPresence(discordConfig.presence);
});

client.commands = new Collection();

comandosJson.forEach(comando => {
    const { data, execute, execute2, execute3, execute4 } = comando;
    
    if (data && data.name && data.description && execute) {
        
        const commandObject = { data };
        commandObject.execute = async (interaction) => {
            
            await interaction.reply(execute);
            
            if (execute2) await interaction.followUp(execute2);
            if (execute3) await interaction.followUp(execute3);
            if (execute4) await interaction.followUp(execute4);
        };
        
        client.commands.set(data.name, commandObject);
    } else {
        console.log(`Comando inválido: ${JSON.stringify(comando)}`);
    }
});

require("./events/interactionCreate.events")(client);
require("./events/messageCreate.events")(client);
require("./events/guildAddRemove.events")(client);

client.login(process.env.DISCORD_TOKEN);

// Pra executar só usar o comando: node index.js
