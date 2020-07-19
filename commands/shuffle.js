const Discord = require('discord.js');

module.exports = {
	name: 'shuffle',
	description: 'Randomiza as musicas na queue do servidor.',
	usage: 'shuffle',
	execute(/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) {
		let channel = message.channel;

		let guild = message.guild;
		/** @type {Queue} */
		let queue = client.queues[guild.id];

		if (!queue) return channel.send('O bot nao esta tocando musica nesse server');

		let np = queue.songs.shift();

		queue.songs = shuffle(queue.songs);
		queue.songs.unshift(np);

		channel.send(':twisted_rightwards_arrows: A queue foi randomizada');
	},
};

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}