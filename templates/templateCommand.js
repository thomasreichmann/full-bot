const Discord = require('discord.js');

module.exports = {
	name: 'template',
	description: 'template',
	aliases: ['templete', 'templote'],
	usage: 'template',
	cooldown: 0,
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		message.channel.send('template');
	},
};