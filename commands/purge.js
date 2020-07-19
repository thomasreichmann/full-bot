const Discord = require('discord.js');

exports.run = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
	let amt = typeof args[0] === 'string' ? args[0] : 10;
	amt = parseInt(amt) + 1;
	amt = amt > 100 ? 100 : amt;

	message.channel.bulkDelete(amt, true)
		.then(messages => {
			message.channel.send({
				'embed': {
					'color': 7536755,
					'fields': [{
						'name': 'Mensagens deletadas :negative_squared_cross_mark:',
						'value': `${messages.size - 1} ${amt - 1 === 1 ? 'mensagem removida' : 'mensagens removidas'}`,
					}],
				},
			})
				.then((m) => {
					m.delete({ timeout: 2000 });
				});
		})
		.catch(err => console.log(err));
};