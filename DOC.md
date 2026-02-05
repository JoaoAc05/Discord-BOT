# Documentação do Discord Bot

## Visão Geral

Este projeto consiste em um **bot para Discord desenvolvido em JavaScript (Node.js)** utilizando a biblioteca **discord.js**. Inicialmente, o BOT foi criado para interações via **Slash Commands (/)**, mas posteriormente evoluiu para integrar-se com o **n8n**, permitindo o envio de mensagens para agentes de IA e o recebimento de respostas automatizadas.

O bot é utilizado como apoio a fluxos internos (ex.: suporte e marketing), além de oferecer comandos utilitários básicos dentro do servidor Discord.

---

## Tecnologias Utilizadas

* **Node.js**
* **discord.js** (Gateway Intents, Slash Commands, Events)
* **n8n** (integração via Webhooks)
* **Fetch API** (envio de mensagens HTTP)
* **dotenv** (variáveis de ambiente)
* **JSON** (configuração e definição de comandos)

---

## Estrutura de Diretórios

```
/
├─ index.js                     # Bootstrap e orquestração do BOT
├─ Comandos.json                # Definição dos Slash Commands
├─ .env                         # Variáveis de ambiente (tokens, IDs, webhooks)
│
├─ config/
│  ├─ discord.config.js         # Configuração do client Discord (intents, presence)
│  └─ n8n.config.js             # Mapeamento de guilds/canais autorizados para o n8n
│
├─ services/
│  └─ n8n.service.js            # Centralização do envio de mensagens ao n8n
│
└─ Eventos/
   ├─ interactionCreate.events.js      # Execução de Slash Commands
   ├─ messageCreate.events.js          # Comandos por texto + integração n8n
   ├─ guildAddRemove.events.js         # Evento de entrada e saída de membros
   ├─ UpdateComandos.commands.js       # Registro/atualização de Slash Commands
   ├─ delete.commands.js               # Remoção de um comando específico
   └─ allDelete.commands.js            # Remoção de todos os comandos

```

---

## Arquitetura Geral
<details>
<summary>
  Ver mais...
</summary>

O projeto segue o princípio de separação de responsabilidades:

| Camada      | Responsabilidade             |
| ----------- | ---------------------------- |
| `index.js`  | Inicialização do bot         |
| `config/`   | Configurações declarativas   |
| `Eventos/`  | Eventos do Discord           |
| `services/` | Regras de integração externa |


## Configuração do Discord (discord.config.js)

Define como o bot se conecta ao Discord:
* Gateway Intents
* Partials
* Presence (status/atividade)

Exemplo de responsabilidades:
* Quais eventos o bot escuta
* Qual status aparece no Discord

## Configuração do n8n (n8n.config.js)

Responsável por definir quais guilds e canais podem enviar mensagens ao n8n.

Características:
* Mapeamento por guildId → channelId
* Cada canal define:
* Nome lógico
* Webhook URL
* Authorization

Todos os valores sensíveis vêm do **.env**.

## Integração com n8n (n8n.service.js)

Características principais:
* Webhook assíncrono
* Não bloqueia o bot
* Retorna sucesso baseado no contexto válido, não na resposta do n8n

Payload enviado:
```
{
  "data": "mensagem do usuário",
  "sessionId": "ID_do_usuario",
  "author": "Nome exibido"
}
```

</details>
---

## Como Executar o Projeto

1. Instalar dependências:

```
npm install
```

2. Configurar o `.env`

3. Registrar os comandos Slash:

```
node ./events/update.commands.js
```

4. Iniciar o bot:

```
node index.js
```

---

## Conclusão

Este bot foi projetado para ser **simples, modular e extensível**, permitindo fácil manutenção e evolução, especialmente para integrações com IA e automações via n8n.
