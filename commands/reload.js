const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'reload',
	description: 'recarrega os comandos do bot.',
	aliases: ['r'],
	usage: 'reload',
	hideHelp: true,
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		fs.readdir('./commands/', (err, files) => {
			if (err) return console.error(err);
			let i = 0;
			files.forEach(file => {
				if (!file.endsWith('.js')) return;

				let commandName = file.split('.')[0];

				delete require.cache[require.resolve(`./${file}`)];
				client.commands.delete(commandName);

				let props = require(`./${file}`);

				client.commands.set(commandName, props);
				i++;
			});

			console.log(`${i} comandos foram recarregados`);
		});
	},
};