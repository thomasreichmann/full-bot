const Discord = require('discord.js');
const Queue = require('../classes/queue');

module.exports = {
	name: 'np',
	description: 'Mostra a musica atual da queue.',
	usage: 'np',
	aliases: ['tocando'],
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let guild = message.guild;
		/** @type {Queue} */
		let queue = client.queues[guild.id];

		if (!queue) return;

		message.channel.send(queue.np());
	},
};