const Discord = require('discord.js');

module.exports = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message) => {
	console.log(`Inicializacao finalizada, perfil: ${client.user.tag}`);

	if (process.env.NODE_ENV === 'production') {
		let guild = client.guilds.cache.find(g => g.id === '402006362571145217');
		if(!guild) return;

		let channel = guild.channels.cache.find(c => c.id === '715970750980554753');
		if(!channel) return;

		channel.send('Filho do thomas online!');
	}
};