const Discord = require('discord.js');

module.exports = {
	name: 'stop',
	description: 'Finaliza a queue atual do server.',
	usage: 'stop',
	aliases: ['parar'],
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let channel = message.channel;

		let guild = message.guild;
		/** @type {Queue} */
		let queue = client.queues[guild.id];

		if (!queue) return channel.send('O bot nao esta tocando musica nesse server');

		queue.destroy();
	},
};