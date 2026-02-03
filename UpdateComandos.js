const config = require("./config.json");
const comandosJson = require("./Comandos.json");
const { REST, Routes } = require("discord.js");

// Instância REST
const rest = new REST({ version: "10" }).setToken(config.token);

// Função de Deploy => Sincroniza a lista de comandos no Discord
(async () => {
    try {
        console.log(`Resetando ${comandosJson.length} comandos.`);

        // Mapear os comandos JSON para o formato esperado pelo Discord. Pois se não ele vai reconhecer como objeto
        const commands = comandosJson.map(comando => ({
            name: comando.data.name,
            description: comando.data.description,
        }));

        // Enviar os comandos para o Discord
        const data = await rest.put(
            Routes.applicationCommands(config.client_id),
            { body: commands }
        );

        console.log("Comandos registrados!");
    } catch (error) {
        console.error(`Erro ao fazer a sincronização dos comandos: ${error}`);
    }
})();