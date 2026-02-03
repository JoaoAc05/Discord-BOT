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
    console.log(`RuralHub Bot foi iniciado em ${client.guilds.cache.size} servidores.`); // Exibir informações de servidores/
    client.user.setActivity(`Conheça a https://ruralhub.com.br/`);
});
client.login(config.token);


// Configurar os comandos do bot
client.commands = new Discord.Collection(); //Criando uma nova colenção que ira armazenar os comandos finais

comandosJson.forEach(comando => { //forEach vai navegar por dentro de cada objeto do array do json
    const { data, execute, execute2, execute3, execute4 } = comando; //Desestruturar o objeto

    if (data && data.name && data.description && execute) { //Garantir que o comando tenha os parâmetros necessarios

        const commandObject = { data }; //Criando um objeto com a propriedade data
        commandObject.execute = async (interaction) => { //Adicionando o execute e demais no objeto junto a suas estruturas de interação

            await interaction.reply(execute); //Extrutura de interação para o execute

            if (execute2) { //Se tiver o execute2 - interagir com followUp
                await interaction.followUp(execute2);
            }
            if (execute3) {
                await interaction.followUp(execute3);
            }
            if (execute4) {
                await interaction.followUp(execute4);
            }
        };

        client.commands.set(data.name, commandObject); //Adicionar os comandos a collection
    } else {
        console.log(`Comando inválido: ${JSON.stringify(comando)}`); //Converte o objeto em string para exibir algum comando que não tenha os parâmetros data e execute
    }
});

// Listener para interações
client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return; //Se não for uma interação de chat de comando ignore

    const command = client.commands.get(interaction.commandName); //command assume os comandos da lista do collection
    if (!command) {
        interaction.reply({
            content: `Comando não encontrado: ${command}`,
            ephemeral: true
        })
        return;
    }

    try {
        // Executar o comando
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Ocorreu um erro ao executar o comando.\nErro: ${error}`,
            ephemeral: true
        });
    }
});

//Requerimento do evento de entrada e saida de membros do servidor.
require("./Eventos/EntradaSaida_Membros")(client);

client.on("messageCreate", async message => {
    const args = message.content.trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(message.author.id == 1194754849733103717) {
        return;
    }
    if(comando === "avatar") { //Enviar a imagem do avatar
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
            // Integração N8N - Bot Suporte
            fetch("https://URL_AI_AGENTE_INTEGRATION", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",  
                        Authorization: "#Suporte.9015brasil#"
                },
                body: JSON.stringify({
                    data: message.content,
                    sessionId: message.author.id
                    //,guildId: message.guild.id,
                    //channelId: message.channel.id,
                    //authorUsername: message.author.username
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log(`Erro ${response.code}: ${response.message}`); // Log detalhada com o res da API
                    throw new Error(`Erro ${response.code}: ${response.message}`); // Captura o erro e envia para o catch
                }
                return;
            })
        }
        else if(message.channel.id == //#) {
            // Integração N8N - Marketing
            fetch("https://URL_AI_AGENTE_INTEGRATION", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",  
                        Authorization: "#Marketing.9015brasil#"
                },
                body: JSON.stringify({
                    data: message.content,
                    sessionId: message.author.id
                    //,guildId: message.guild.id,
                    //channelId: message.channel.id,
                    //authorUsername: message.author.username
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log(`Erro ${response.code}: ${response.message}`); // Log detalhada com o res da API
                    throw new Error(`Erro ${response.code}: ${response.message}`); // Captura o erro e envia para o catch
                }
                return;
            })
        }
        return;
    }
})
// Pra executar só usar o comando: node index.js
