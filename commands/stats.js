const Discord = require('discord.js');

module.exports = {
	name: 'stats',
	description: 'Mostra as estatisticas do bot.',
	usage: 'stats',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let users = 0;
		let guilds = 0;

		client.guilds.cache.forEach(guild => {
			users += guild.memberCount;
			guilds++;
		});

		let embed = new Discord.MessageEmbed()
			.addFields([
				{ name: 'Guilds :file_cabinet:', value: guilds },
				{ name: 'Users :busts_in_silhouette:', value: users }]);

		message.channel.send(embed);
	},
};