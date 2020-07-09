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

        // this.loop = false;
        // this.qloop = false;
        this.playing = false;
    }

    end() {
        console.log(`Finalizando queue no servidor: "${this.guild.name}" | "${this.guild.id}"`)
        this.playing = false;
        this.songs = undefined
        this.dispatcher.destroy()
        this.connection.disconnect();
        this.client.queues[this.guild.id] = undefined
    }

    skip() {
        this.dispatcher.end()
    }

    addSong(video) {
        this.songs.push(video)
        console.log(`Video: ${video.title} URL: ${video.url} adicionada na queue`)


        if (!this.playing) this.play()
    }

    async play() {
        this.dispatcher = this.connection.play(await ytdl(this.songs[0].url), {
            type: 'opus'
        })

        this.playing = true

        this.dispatcher.on(`finish`, () => {
            let url = this.songs.shift()
            console.log(`URL ${url} foi removida da queue`)
            if(this.songs.length > 0) {
                this.play()
            } else {
                this.playing = false;
                this.end()
            }
        })

        this.dispatcher.on(`error`, (err) => {
            console.log(err)
        })
    }
}