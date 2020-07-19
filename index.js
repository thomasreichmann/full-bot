if (process.env.NODE_ENV != 'production') {
	require('dotenv').config();
	console.log('Dev mode');
}

const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const Queue = require('./classes/queue');

const fs = require('fs');

client.commands = new Enmap();

client.ghost = false;

client.queues = {};

client.config = require('./config.json');
if(process.env.NODE_ENV != 'production') {
	client.config.prefix = ',';
}

fs.readdir('./events', (err, files) => {
	if (err) return console.log(`Erro ao carregar os arquivos de eventos\n${err}`);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;

		const event = require(`./events/${file}`);

		let eventName = file.split('.')[0];

		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;

		let props = require(`./commands/${file}`);

		let commandName = file.split('.')[0];
		console.log(`Carregando o comando ${commandName}`);

		client.commands.set(commandName, props);
	});
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));

client.login(process.env.TOKEN);