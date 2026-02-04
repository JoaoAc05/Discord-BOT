const { Client, Collection } = require('discord.js');

require('dotenv').config();
const discordConfig = require('./config/discord.config');
const comandosJson = require("./Comandos.json");

const client = new Client(discordConfig.client);

client.once("ready", () => {
    console.log(`Discord-Bot foi iniciado em ${client.guilds.cache.size} servidores.`);
    client.user.setPresence(discordConfig.presence);
});

client.commands = new Collection();
client.login(process.env.DISCORD_TOKEN);

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

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        interaction.reply({
            content: `Comando não encontrado: ${command}`,
            ephemeral: true
        })
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Ocorreu um erro ao executar o comando.\nErro: ${error}`,
            ephemeral: true
        });
    }
});

require("./events/EntradaSaida_Membros")(client);
const { sendMessageToN8n } = require("./services/n8n.service");

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "avatar") {
        message.channel.send(
            message.author.displayAvatarURL({ extension: "webp", size: 256 })
        );
        return;
    }
    if (comando === "ping") {
        try {
            const m = await message.channel.send("Pong!");
            m.edit(`Latencia do bot é: ${m.createdTimestamp - message.createdTimestamp}ms`);
        } catch (error) {
            console.log(error)
            await message.send({
                content: `Ocorreu um erro ao verificar atividade do BOT.\nErro: ${error}`,
                ephemeral: true
            })
        }
        return;
    }

    const success = await sendMessageToN8n({
        guildId: message.guild?.id,
        channelId: message.channel.id,
        message: message.content,
        sessionId: message.author.id,
        author: message.member.displayName
    });

    if (!success) {
        console.log(`Mensagem ignorada.`);
        return;
    }

})

// Pra executar só usar o comando: node index.js
