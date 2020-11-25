const Discord = require('discord.js');

module.exports = {
	name: 'move',
	description: 'template',
	aliases: ['m', 'voice'],
	usage: 'move <voice channel id>',
	cooldown: 0,
	permission: 8,
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		// Verifica se o bot tem as permissoes para mover usuarios
		let bot = message.guild.members.cache.find(m => m.id === client.user.id);
		if (!bot.hasPermission(16777216)) return message.reply('o bot nao tem permissao para mover membros do servidor (`.hasPermission(16777216)`)');

		let currentVoice = message.member.voice;
		// TODO: adicionar funcionalidade para mover pessoas de um canal de voz para o outro sem estar em nenhum canal
		if(!currentVoice) return message.reply('voce precisa estar em um canal de voz para usar esse comando');

		if (!args[0]) return message.reply('coloque o id de um canal de voz como argumento para esse comando (`!args`)');
		let id = args[0];
		// check if string contains only digits
		if(!/^\d+$/.test(id)) return message.reply('o id do canal de voz provido nao e valido, ele contem letras (`!/^\\d+$/`)');
		// voice id integrity check
		if(id.length != 18) return message.reply('o id do canal de voz provavelmente esta cortado, copie ele novamente (`length != 18`)');

		let newVoice = message.guild.channels.cache.get(id);
		if(!newVoice) return message.reply('nao encontrei nenhum canal de voz com esse id (`!newVoice`)');

		// verifica as permissioes que o bot tem para o newVoice, caso nao tenha permissao de conectar (1048576) return;
		if(!newVoice.permissionsFor(bot).has(1048576)) return message.reply('o bot nao tem acesso a esse canal de voz (`.has(1048576)`)');

		for (let member of currentVoice.channel.members.array()) {
			member.voice.setChannel(newVoice, `${message.member.user.username} utilizou o comando para mover os integrantes do canal de voz`);
		}

		return message.reply(`${currentVoice.channel.members.size} membros movidos de canal`);
	},
};