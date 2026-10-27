const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const ACCESS_ROLE_ID = '1564772762533232661';

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const hadAccess = oldMember.roles.cache.has(ACCESS_ROLE_ID);
  const hasAccess = newMember.roles.cache.has(ACCESS_ROLE_ID);

  // DM only when the Access role is newly added
  if (!hadAccess && hasAccess) {
    try {
      await newMember.send(
        'Hey! You’ve been granted access to Creator Inquiries! You can use the channel to discuss commissions, artwork, and collabs.'
      );
      console.log(`DM sent to ${newMember.user.tag}`);
    } catch (error) {
      console.log(`Could not DM ${newMember.user.tag}. Their DMs may be closed.`);
    }
  }
});

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

client.login(process.env.DISCORD_TOKEN);
