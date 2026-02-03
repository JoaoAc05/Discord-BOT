const config = require("./config.json");
const comandosJson = require("./Comandos.json");
const { REST, Routes } = require("discord.js");

// Instância REST
const rest = new REST({ version: "10" }).setToken(config.token);

// Função de Deploy => Sincroniza a lista de comandos no Discord
(async () => {
    try {
        await console.log(`Resetando ${comandosJson.length} comandos.`);

        await rest.put(Routes.applicationCommands(config.client_id), { body: [] }); //Para os comandos do bot

        await console,log("Comandos do BOT deletados.")

        await rest.put(Routes.applicationGuildCommands(config.client_id, config.guild_id), { body: [] }) //Para os comandos no servidor

        await console.log("Comandos deletados do servidor!\nFavor iniciar o arquivo UpdateComandos.js para realizar a sincronização novamente");
    } catch (error) {
        console.error(error);
    }
})();