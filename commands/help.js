const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lista todos os comandos do bot.',
	aliases: ['ajuda'],
	usage: 'help',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let prefix = client.config.prefix;
		let commands = client.commands;

		if(!args.length) {
			// Caso o comando tenha hideHelp, nao mostramos ele no help
			let c = commands.filter(command => !command.hideHelp).map(command => `\`${command.name}\``).join(', ');
			let embed = new Discord.MessageEmbed()
				.addField('Aqui esta uma lista dos meus comandos:', c)
				.setFooter(`Mande '${prefix}help [comando]' para ver um comando especifico`);

			return message.channel.send(embed);
		}

		let name = args[0].toLowerCase();
		let command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Isso nao e um comando valido');
		}

		let embed = new Discord.MessageEmbed();
		let data = [''];

		data.push(`**Nome:** ${command.name}\n`);

		if (command.aliases) data.push(`**Apelidos:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descricao:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

		embed.setDescription(data);
		message.channel.send(embed);
	},
};