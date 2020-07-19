const ytdl = require('ytdl-core-discord');
const ytpl = require('ytpl');
const ytsr = require('ytsr');

const Song = require('./song');

module.exports = class ytHandler {
	async parseUrl(url) {
		// Decide se a url e um video ou uma playlist, recebe o(s) video(s) e retorna

		// Caso nao for uma playlist vamos ter um erro, logo assumimos que seja um video
		try {
			return await this.getPlaylist(url);
		}
		catch {
			return await this.getVideo(url);
		}
	}

	async getSearch(query) {
		let results = (await ytsr(query)).items;

		let i = 0;

		let result = results[i];
		// Caso o primeiro resultado nao for um video, checamos todos os resultados disponiveis ate achar o primeiro video
		while(result.type != 'video') {
			i++;

			if(i > results.length - 1) throw `Erro, nenhum video foi encontrado a partir da query: ${query}`;

			result = results[i];
		}

		let videos = [new Song(result.link, result.title, result.duration)];

		return videos;
	}

	async getVideo(url) {
		let data;

		data = await ytdl.getBasicInfo(url);

		let videos = [new Song(data.video_url, data.title, parseTime(data.length_seconds))];

		return videos;
	}

	async getPlaylist(url) {
		let data = await ytpl(url);
		let videos = [];

		data.items.forEach(song => {
			videos.push(new Song(song.url, song.title, song.duration));
		});

		return videos;
	}
};

function parseTime(secs) {
	let sec_num = parseInt(secs, 10);
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor(sec_num / 60) % 60;
	let seconds = sec_num % 60;

	return [hours, minutes, seconds]
		.map(v => v < 10 ? '0' + v : v)
		.filter((v, i) => v !== '00' || i > 0)
		.join(':');
}