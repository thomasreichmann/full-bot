const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');

const Queue = require('../classes/queue');
const InputHandler = require('../classes/inputHandler');

module.exports = {
	name: 'play',
	description: 'Adiciona uma musica/musicas na queue do servidor.',
	aliases: ['p'],
	usage: 'play [spotify/youtube/pesquisa]',
	cooldown: 0,
	async execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let channel = message.channel;
		let voice = message.member.voice;
		if (!voice.channel) return channel.send('Voce nao esta conectado em um canal de voz');

		let input = args[0];
		if (!input) return channel.send('Especifique uma url para ser tocada');

		let inputHandler = new InputHandler();

		let guild = message.guild;
		/** @type {Queue} */
		let queue = client.queues[guild.id];

		try {
			let connection = await voice.channel.join();

			if (!queue) {
				client.queues[guild.id] = queue = new Queue(client, guild, connection, channel);
			}

			try {
				let loadingEmbed = new Discord.MessageEmbed()
					.setColor('87148C')
					.setDescription('Carregando musicas... \nIsso pode demorar um pouco');

				let loadingMessage = await channel.send(loadingEmbed);

				let videos = await inputHandler.parse(input);

				if (videos) {
					videos.forEach(video => {
						queue.addSong(video);
					});

					loadingMessage.delete();

					let addEmbed = new Discord.MessageEmbed()
						.setColor('87148C');

					if (videos.length > 1) {
						addEmbed.setDescription(`**${videos.length}** videos adicionados na queue`);
					}
					else {
						let song = videos[0];
						addEmbed.setDescription(`**Video adicionado:**\n[[\`00:00\`](${song.url})/[\`${song.length}\`](${song.url})]\n${song.title}`);
					}

					channel.send(addEmbed);
				}
				else {
					connection.disconnect();

					return channel.send('Erro ao achar videos com o input dado.');
				}
			}
			catch (err) {
				console.error(`Erro com play.js:\n${err}`);
			}
		}
		catch (err) {
			console.error(err);
		}
	},
};