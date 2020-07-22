const Discord = require('discord.js');
const Queue = require('../classes/queue');

module.exports = {
	name: 'loop',
	description: 'Comeca a repetir uma musica ou a queue de musica.',
	usage: 'loop [q?]',
	aliases: ['repetir'],
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let guild = message.guild;
		/** @type {Queue} */
		let queue = client.queues[guild.id];

		if (!queue) return;

		if(args[0] === 'q') queue.qloop = !queue.qloop;
		else queue.loop = !queue.loop;

		let qloop = queue.qloop ? ':white_check_mark:' : ':x:';
		let loop = queue.loop ? ':white_check_mark:' : ':x:';

		let embed = new Discord.MessageEmbed()
			.setColor(client.config.color)
			.addFields([
				{ name: 'Loop da musica atual:', value: loop },
				{ name: 'Loop da queue:', value: qloop },
			]);

		message.channel.send(embed);
	},
};