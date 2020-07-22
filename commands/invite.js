const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Mostra o link de invite do bot',
	usage: 'invite',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let link = 'https://discordapp.com/oauth2/authorize?client_id=482753018652262401&scope=bot&permissions=8';

		let embed = new Discord.MessageEmbed()
			.setColor(client.config.color)
			.setDescription(`Voce pode me adicionar ao seu server por **[aqui](${link})!**`);

		try {
			message.channel.send(embed);
		}
		catch (err) {
			console.error(`Erro ao mandar invite embed:\n${err}`);
		}
	},
};