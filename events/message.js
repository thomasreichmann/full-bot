const Discord = require('discord.js');

module.exports = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message) => {
	if (message.guild == null) return;
	if (message.author.bot) return;

	if(message.author.ghost) {
		message.delete();
	}

	let prefix = client.config.prefix;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));
	if(!cmd) return;

	// Check de permissoes
	if(cmd.ids && !cmd.ids.find(id => id === message.author.id)) return;
	if(cmd.permission && !message.member.hasPermission(cmd.permission)) return;
	if(cmd.guilds && !cmd.guilds.find(id => id === message.guild.id)) return;

	if (!cmd) return;
	cmd.execute(client, message, args);
};