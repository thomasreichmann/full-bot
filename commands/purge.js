const Discord = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Deleta um numero de mensagens de um canal.',
	usage: 'purge [n]',
	async execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let amt = typeof args[0] === 'string' ? args[0] : 10;
		amt = parseInt(amt) + 1;
		amt = amt > 100 ? 100 : amt;

		let messages = await message.channel.bulkDelete(amt, true);
		let m = await message.channel.send({
			'embed': {
				'color': 7536755,
				'fields': [{
					'name': 'Mensagens deletadas :negative_squared_cross_mark:',
					'value': `${messages.size - 1} ${amt - 1 === 1 ? 'mensagem removida' : 'mensagens removidas'}`,
				}],
			},
		});

		m.delete({ timeout: 2000 });
	},
};