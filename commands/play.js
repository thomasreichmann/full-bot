const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord');

const Queue = require(`../classes/queue`)

exports.run = async ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let channel = message.channel
    let voice = message.member.voice
    if (!voice.channel) return channel.send(`Voce nao esta conectado em um canal de voz`)

    let url = args[0]
    if (!url) return channel.send(`Especifique uma url para ser tocada`)

    let guild = message.guild
    /** @type {Queue} */
    let queue = client.queues[guild.id]

    voice.channel.join()
        .then(connection => {
            // console.log(`Comecando a tocar a url: ${url}`)
            // play(connection, url)

            if (!queue) {
                client.queues[guild.id] = queue = new Queue(client, guild, connection, channel)
            }

            queue.addSong(url)
        })
        .catch(err => {
            message.channel.send(`Erro ao entrar no canal de voz.`)
            console.error(err)
        })
}