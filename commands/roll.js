const Discord = require('discord.js');
const Functions = require('../functions');
const fn = new Functions();

module.exports = {
	name: 'roll',
	description: 'Escolhe um numero de 1 a 100.',
	usage: 'roll [max]',
	cooldown: 0,
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let max = fn.checkNull(args[0], 100);

		message.reply(`${Math.floor(fn.random(max))}!`);
	},
};