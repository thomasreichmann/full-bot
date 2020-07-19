const Discord = require('discord.js');

module.exports = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message) => {
	if (message.guild == null) return;
	if (message.author.bot) return;

	// Commando ghost
	if (message.author.id == '181270590672338944' && client.ghost == true) {
		message.delete().catch(err => console.log(err));
	}

	let prefix = client.config.prefix;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));

	if (!cmd) return;
	cmd.execute(client, message, args);
};