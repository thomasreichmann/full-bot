const Discord = require('discord.js');
const Functions = require('../functions');
const fn = new Functions();

exports.run = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
	let max = fn.checkNull(args[0], 100);

	message.reply(`${Math.floor(fn.random(max))}`);
};