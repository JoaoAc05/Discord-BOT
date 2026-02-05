# Discord Bot

## Visão Geral

Bot para Discord desenvolvido em **Node.js** com arquitetura modular, suporte a **Slash Commands**, comandos por mensagem e integração com **n8n** via Webhooks para automações, atendimento e fluxos inteligentes.

Projetado para ser simples de manter, seguro e escalável.

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

## Documentação
Você pode encontrar uma documentação detalhada da arquitetura e do funcionamento em ./doc.md
