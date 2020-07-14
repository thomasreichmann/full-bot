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

        this.playing = false;
    }

    end() {
        console.log(`Finalizando queue no servidor: "${this.guild.name}" | "${this.guild.id}"`)
        this.playing = false;
        this.songs = undefined;
        if (this.dispatcher) this.dispatcher.end();
        this.connection.disconnect();
        this.client.queues[this.guild.id] = undefined;
    }

    skip() {
        if (this.dispatcher) return this.dispatcher.end()
    }

    addSong(video) {
        this.songs.push(video)
        console.log(`Video adicionado: "${video.title}"\n Length: "${video.length}"\n URL: "${video.url}"\n Guild: "${this.guild.name}" ID: "${this.guild.id}"\n`)

        if (!this.playing) this.play()
    }

    async play() {
        try {
            this.dispatcher = this.connection.play(await ytdl(this.songs[0].url, {
                filter: 'audioonly',
                highWaterMark: 1 << 25
            }), {
                type: 'opus'
            })
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

        this.playing = true

        this.dispatcher.on(`finish`, (reason) => {
                console.log(`Reason: ${reason}`)

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