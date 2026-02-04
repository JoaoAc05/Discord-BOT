const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.GuildMembers,
    ],
});
const config = require("./config.json");
const comandosJson = require("./Comandos.json");


client.once("ready", () => {
    console.log(`RuralHub Bot foi iniciado em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`Conheça a https://ruralhub.com.br/`);
});
client.login(config.token);


client.commands = new Discord.Collection(); 

comandosJson.forEach(comando => {
    const { data, execute, execute2, execute3, execute4 } = comando; 

    if (data && data.name && data.description && execute) {

        const commandObject = { data };
        commandObject.execute = async (interaction) => { 

            await interaction.reply(execute);

            if (execute2) {
                await interaction.followUp(execute2);
            }
            if (execute3) {
                await interaction.followUp(execute3);
            }
            if (execute4) {
                await interaction.followUp(execute4);
            }
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

require("./Eventos/EntradaSaida_Membros")(client);

client.on("messageCreate", async message => {
    const args = message.content.trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(message.author.id == //#) {
        return;
    }
    if(comando === "avatar") {
        message.channel.send(`https://cdn.discordapp.com/avatars/565974725797609514/${message.author.avatar}.webp?size=256`);
        return;
    }
    if(comando === "ping") {
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

    if(message.guild.id == //#) {

        if(message.channel.id == //#) {
            fetch("https://URL_AI_AGENTE_INTEGRATION", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",  
                        Authorization: "#Suporte.9015brasil#"
                },
                body: JSON.stringify({
                    data: message.content,
                    sessionId: message.author.id
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log(`Erro ${response.code}: ${response.message}`);
                    throw new Error(`Erro ${response.code}: ${response.message}`);
                }
                return;
            })
        }
        else if(message.channel.id == //#) {
            fetch("https://URL_AI_AGENTE_INTEGRATION", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",  
                        Authorization: "#Marketing.9015brasil#"
                },
                body: JSON.stringify({
                    data: message.content,
                    sessionId: message.author.id
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log(`Erro ${response.code}: ${response.message}`); 
                    throw new Error(`Erro ${response.code}: ${response.message}`);
                }
                return;
            })
        }
        return;
    }
})

// Pra executar só usar o comando: node index.js
