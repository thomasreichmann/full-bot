const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord');

module.exports = class Queue {
    constructor(client, guild, connection, channel) {
        /**@type {Discord.Guild} */
        this.guild = guild
        /**@type {Discord.VoiceConnection} */
        this.connection = connection
        /**@type {Discord.TextChannel} */
        this.channel = channel
        /**@type {Discord.Client} */
        this.client = client

        this.songs = []

        /**@type {Discord.StreamDispatcher} */
        this.dispatcher;

        this.npMessage;
        this.playing = false;
    }

    end() {
        console.log(`Finalizando queue no servidor: "${this.guild.name}" | "${this.guild.id}"`)
        this.playing = false;
        if (this.npMessage) this.npMessage.delete()
        if (this.dispatcher) this.dispatcher.destroy();
        this.songs = undefined;
        this.connection.disconnect();
        this.client.queues[this.guild.id] = undefined;
    }

    skip() {
        if (this.dispatcher) return this.dispatcher.end()
    }

    np() {
        // Gera um message embed contendo a musica sendo tocada
        let song = this.songs[0]
        if (!song) return;

        let streamTime = Math.floor(this.dispatcher.streamTime / 1000)

        let embed = new Discord.MessageEmbed()
            .setColor(`87148C`)
            .setDescription(`**Tocando:**\n[[\`${parseTime(streamTime)}\`](${song.url})/[\`${song.length}\`](${song.url})]\n${song.title}`)

        return embed;
    }

    addSong(video) {
        this.songs.push(video)
        console.log(`Video adicionado: "${video.title}"\n Length: "${video.length}"\n URL: "${video.url}"\n Guild: "${this.guild.name}" ID: "${this.guild.id}"\n`)

        if (!this.playing) this.play()
    }

    async play() {
        try {
            this.playing = true
            let song = this.songs[0]

            this.dispatcher = this.connection.play(await ytdl(song.url, {
                filter: 'audioonly',
                quality: 'lowest'
            }), {
                type: 'opus'
            })

            try {
                if (this.npMessage) await this.npMessage.delete()
            } catch (err) {
                console.error(`Erro ao deletar npMessage:\n${err}`)
            } finally {
                this.npMessage = await this.channel.send(this.np())
            }
        } catch (err) {
            console.error(err)

            // Caso o ytdl tenha retornado um erro, nao teremos um dispatcher, se ainda existem musicas na queue,
            // pulamos a musica que causou o erro e continuamos
            if (this.songs.length > 1) {
                this.songs.shift()
                this.play()
            } else {
                this.end()
            }
        }

        this.dispatcher.on(`finish`, () => {
                let video = this.songs.shift()

                // Console.log longo para debug
                console.log(`Video removido: "${video.title}"\n URL: "${video.url}"\n Guild: "${this.guild.name}" ID: "${this.guild.id}"\n`)
                if (this.songs.length > 0) {
                    this.play()
                } else {
                    this.playing = false;
                    this.end()
                }
            })
            .on(`error`, (err) => {
                console.log(`Erro dispatcher error event:\n${err}`)
            })
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