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

    try {
        let connection = await voice.channel.join()

        if (!queue) {
            client.queues[guild.id] = queue = new Queue(client, guild, connection, channel)
        }

        try {
            let videos = await inputHandler.parse(input)

            if (videos) {
                videos.forEach(video => {
                    queue.addSong(video)
                });
            } else {
                connection.disconnect()

                channel.send(`Erro ao achar videos com o input dado.`)
            }
        } catch (err) {
            console.error(`Erro com play.js:\n${err}`)
        }
    } catch (err) {
        console.error(err)
    }
}