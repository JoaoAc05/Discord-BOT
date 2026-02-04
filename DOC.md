# Documentação do Discord Bot

## Visão Geral

Este projeto consiste em um **bot para Discord desenvolvido em JavaScript (Node.js)** utilizando a biblioteca **discord.js**. Inicialmente, o BOT foi criado para interações via **Slash Commands (/)**, mas posteriormente evoluiu para integrar-se com o **n8n**, permitindo o envio de mensagens para agentes de IA e o recebimento de respostas automatizadas.

O bot é utilizado como apoio a fluxos internos (ex.: suporte e marketing), além de oferecer comandos utilitários básicos dentro do servidor Discord.

---

## Tecnologias Utilizadas

* **Node.js**
* **discord.js** (Gateway Intents, Slash Commands, Events)
* **JSON** (configuração e definição de comandos)
* **n8n** (integração via Webhooks)
* **Fetch API** (envio de mensagens HTTP)

---

## Estrutura de Diretórios

```
/
├─ index.js                    # Arquivo principal, inicialização e orquestração do BOT
├─ Comandos.json               # Definição dos Slash Commands
├─ .env                        # Dados sensíveis (token, configs privadas)
├─ UpdateComandos.js           # Script para registrar/atualizar comandos no Discord
├─ DeleteComando.js            # Script para remover um comando específico
├─ DeleteTodosComandos.js      # Script para remover todos os comandos registrados
├─ config/
│  ├─ discord.config.js        # Configurações e permissões do BOT
│  └─ n8n.config.js            # Gerenciamento da Guild e Channel que pode enviar as mensagens ao n8n
├─ services/
│  └─ n8n.service.js           # Reponsavel por receber as mensagens e enviar ao n8n conforme n8n.confg.js
└─ Eventos/
   └─ EntradaSaida_Membros.js  # Evento de entrada e saída de membros
```

---

## Arquitetura e Funcionamento do BOT
<details>
<summary>
  Ver mais...
</summary>

## Arquivo `index.js`

O `index.js` é o **ponto de entrada do projeto**. Ele é responsável por:

* Inicializar o cliente do Discord
* Configurar intents
* Carregar comandos
* Registrar listeners de interações, mensagens e eventos
* Integrar com o n8n via Webhooks

### 1. Inicialização do Cliente

O bot cria uma instância do `Discord.Client` com os intents necessários:

* `Guilds`
* `GuildMessages`
* `MessageContent`
* `GuildMembers`

Esses intents permitem que o bot:

* Leia mensagens
* Responda comandos
* Detecte entrada e saída de membros

---

### 2. Autenticação

O token do bot é carregado a partir do arquivo `config.json`:

```json
{
  "token": "SEU_TOKEN_AQUI"
}
```

---

### 3. Evento `ready`

Executado quando o bot conecta com sucesso ao Discord.

Funções executadas:

* Loga a quantidade de servidores conectados
* Define o status/atividade do bot

---

### 4. Sistema de Slash Commands

Os comandos são definidos no arquivo `Comandos.json` e carregados dinamicamente.

Fluxo:

1. O arquivo JSON é lido
2. Cada comando é validado
3. Os comandos válido
4. Cada comando possui:
   - `data` (nome e descrição)
   - `execute` (resposta principal)
   - `execute2`, `execute3`, `execute4` (respostas adicionais via `followUp`)

Esse modelo permite **respostas encadeadas** sem duplicar lógica.

---

### 5. Listener `interactionCreate`

Responsável por capturar **Slash Commands (/)**.

Fluxo:

1. Verifica se a interação é um comando de chat
2. Busca o comando na collection
3. Executa o método `execute`
4. Trata erros de forma segura (resposta ephemeral)

---

### 6. Eventos de Entrada e Saída de Membros

O arquivo `Eventos/EntradaSaida_Membros.js` é importado e recebe o `client` como parâmetro.

Responsabilidades:
- Monitorar quando um membro entra ou sai do servidor
- Disparar mensagens automáticas (ex.: boas-vindas ou alertas)

Esse padrão mantém o código **modular e organizado**.

---

### 7. Listener `messageCreate`

Este listener trata **mensagens comuns**, fora do contexto de Slash Commands.

Funcionalidades implementadas:

#### a) Filtro de mensagens do próprio bot

Evita loops ignorando mensagens enviadas pelo próprio bot.

#### b) Comandos simples por texto

- `ping`: retorna a latência do bot
- `avatar`: retorna a URL do avatar do usuário

Esses comandos funcionam sem `/` e são úteis para testes rápidos.

---

### 8. Integração com n8n

A integração com o **n8n** ocorre apenas em:

- Um servidor específico (`guild.id`)
- Canais específicos (`channel.id`)

Atualmente existem dois fluxos:

#### a) Suporte

- Canal dedicado a suporte
- Envia mensagens para um webhook n8n
- Usa `sessionId` baseado no ID do usuário

#### b) Marketing

- Canal dedicado a marketing
- Webhook separado
- Mantém sessões independentes

Formato do payload enviado:

```json
{
  "data": "mensagem do usuário",
  "sessionId": "ID_do_usuario"
}
```

Esse modelo permite que o n8n:
- Identifique o usuário
- Mantenha contexto de conversa
- Encaminhe mensagens para agentes de IA

---

## Boas Práticas Adotadas

- Separação de responsabilidades (eventos, comandos, integrações)
- Uso de `Collection` para gerenciamento de comandos
- Proteção de dados sensíveis em `config.json`
- Validação de comandos antes do registro
- Tratamento básico de erros

</details>
---

## Como Executar o Projeto

1. Instalar dependências:

```
npm install discord.js
```

2. Configurar o `config.json`

3. Registrar os comandos Slash:

```
node UpdateComandos.js
```

4. Iniciar o bot:

```
node index.js
```

---

## Conclusão

Este bot foi projetado para ser **simples, modular e extensível**, permitindo fácil manutenção e evolução, especialmente para integrações com IA e automações via n8n.
