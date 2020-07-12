const ytdl = require('ytdl-core-discord');
const ytpl = require(`ytpl`)
const ytsr = require(`ytsr`)

const Song = require(`./song`)

module.exports = class ytHandler {
    async parseUrl(url) {
        // Decide se a url e um video ou uma playlist, recebe o(s) video(s) e retorna

        // Caso nao for uma playlist vamos ter um erro, logo assumimos que seja um video
        try {
          return await this.getPlaylist(url)
        } catch {
            return await this.getVideo(url)
        }
    }

    async getSearch(query) {
        try {
            let result = (await ytsr(query)).items[0]

            let videos = [new Song(result.link, result.title, result.duration)]

            return videos;
        } catch (err) {
            throw err;
        }
    }

    async getVideo(url) {
        let data;

        try {
            data = await ytdl.getInfo(url)
        } catch (err) {
            throw err;
        }

        let videos = [new Song(data.video_url, data.title, parseTime(data.length_seconds))]

        return videos;
    }

    async getPlaylist(url) {
        let data;

        try {
            data = await ytpl(url)
        } catch (err) {
            throw err;
        }

        let videos = []

        data.items.forEach(song => {
            videos.push(new Song(song.url, song.title, song.duration))
        })

        return videos;
    }
}

var parseTime = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}