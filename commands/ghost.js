const Discord = require('discord.js');

module.exports = {
	name: 'ghost',
	description: 'Habilita/Desabilita deletamento automatico de mensagens do owner.',
	usage: 'ghost',
	ids: ['181270590672338944'],
	hideHelp: true,
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		// client.ghost = client.ghost ? false : true;
		if (!message.author.ghost) message.delete().catch(err => console.log(err));
		message.author.ghost = message.author.ghost ? false : true;
	},
};