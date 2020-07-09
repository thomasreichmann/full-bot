const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord');
const ytpl = require(`ytpl`)
const ytsr = require(`ytsr`)

module.exports = class InputHandler {
    async parse(input) {
        // Input pode ser: Video yt, Playlist yt, Termo de pesq., Track spotf, Album spotf, Playlist spotf.

        // Extrai o nome do domino de um link ex: www.google.com = google
        let service = input.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split(".")[0].toLowerCase()

        let info = []

        if (service === `youtube` || service === `youtu`) {
            try {
                let data = await ytpl(input)

                data.items.forEach(song => {
                    info.push(new Song(song.url, song.title))
                })
            } catch {
                try {
                    let data = await ytdl.getInfo(input)
                    info.push(new Song(data.video_url, data.title))
                } catch {
                    console.error(`Erro no parse link youtube ${input}`)
                }
            }
        } else if (service === `open`) {
            return null;
        } else {
            // Nao achamos o dominio logo eh uma pesquisa
            try {
                let data = await (await ytsr(input)).items[0]

                info.push(new Song(data.title, data.link))
            } catch (err) {
                console.error(err)
            }
        }
        return info;
    }
}

class Song {
    constructor(url, title) {
        this.url = url
        this.title = title
    }
}