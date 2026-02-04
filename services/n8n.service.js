const n8nConfig = require("../config/n8n.config");

async function sendMessageToN8n({ guildId, channelId, message, sessionId, author }) {
  const guild = n8nConfig.guilds[guildId];
  if (!guild) return false;

  const channel = guild.channels[channelId];
  if (!channel) return false;

  try {
    const response = await fetch(channel.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: channel.authorization
      },
      body: JSON.stringify({
        data: message,
        sessionId
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`N8N error: ${response.status} - ${text}`);
    }

    return true;
  } catch (error) {
    console.error("[N8N SERVICE ERROR]", {
      guildId,
      channelId,
      error: error.message
    });

    return false;
  }
}

module.exports = {
  sendMessageToN8n
};
