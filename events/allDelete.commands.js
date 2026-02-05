require('dotenv').config();
const comandosJson = require("../Comandos.json");
const { REST, Routes } = require("discord.js");

// Instância REST
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Função de Deploy => Sincroniza a lista de comandos no Discord
(async () => {
    try {
        await console.log(`Resetando ${comandosJson.length} comandos.`);

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] }); //Para os comandos do bot

        await console, log("Comandos do BOT deletados.")

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] }) //Para os comandos no servidor

        await console.log("Comandos deletados do servidor!\nFavor iniciar o arquivo UpdateComandos.js para realizar a sincronização novamente");
    } catch (error) {
        console.error(error);
    }
})();