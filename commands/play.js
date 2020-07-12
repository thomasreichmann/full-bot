const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord');

const Queue = require(`../classes/queue`)
const InputHandler = require(`../classes/inputHandler`)

exports.run = async ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let channel = message.channel
    let voice = message.member.voice
    if (!voice.channel) return channel.send(`Voce nao esta conectado em um canal de voz`)

    let input = args[0]
    if (!input) return channel.send(`Especifique uma url para ser tocada`)

    let inputHandler = new InputHandler()

    let guild = message.guild
    /** @type {Queue} */
    let queue = client.queues[guild.id]

    voice.channel.join()
        .then(connection => {

            if (!queue) {
                client.queues[guild.id] = queue = new Queue(client, guild, connection, channel)
            }
            inputHandler.parse(input)
                .then(videos => videos.forEach(video => {
                    queue.addSong(video)
                }))
        })
        .catch(err => {
            message.channel.send(`Erro ao entrar no canal de voz.`)
            console.error(err)
        })
}