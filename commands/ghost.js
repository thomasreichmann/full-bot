const Discord = require('discord.js');

module.exports = {
	name: 'ghost',
	description: 'Habilita/Desabilita deletamento automatico de mensagens do owner.',
	usage: 'ghost',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		if (message.author.id == '181270590672338944') {
			client.ghost = client.ghost ? false : true;
			if (client.ghost == true) message.delete().catch(err => console.log(err));
		}
	},
};