const Discord = require('discord.js');
const Queue = require('../classes/queue');

module.exports = {
	name: 'queue',
	description: 'Mostra a queue atual do server.',
	aliases: ['q'],
	usage: 'queue [pagina]',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		const guild = message.guild;
		/** @type {Queue} */
		const queue = client.queues[guild.id];
		if (!queue) return;

		const page = args[0] ? args[0] : 1;
		const s = page > 1 ? (page - 1) * 10 : 0;
		let response = '';

		let pages = Math.floor(queue.songs.length / 10) + 1;

		// Provavel que exista uma maneira de fazer isso mais "bonitamente"
		pages = pages ? pages : 1;

		if (s > queue.songs.length - 1) return message.reply('Essa pagina nao existe na queue');

		for (let i = s; i < queue.songs.length; i++) {
			const song = queue.songs[i];

			response += `**${i + 1}. ** [\`${song.length}\`](${song.url}) ${song.title} \n`;
			if (i >= s + 9) break;
		}

		const embed = new Discord.MessageEmbed()
			.setColor('87148C')
			.setAuthor(`Queue | ${guild.name}`, guild.iconURL({ dynamic: true }))
			.setDescription(response)
			.setFooter(`Pagina ${page}/${pages}`);
		message.channel.send(embed);
	},
};