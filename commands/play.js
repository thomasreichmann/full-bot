const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord');

exports.run = async ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {

    async function play(connection, url) {
        /**@type {Discord.StreamDispatcher} */
        let dispatcher = connection.play(await ytdl(url), {
            type: 'opus'
        });
    }

    let channel = message.channel
    let voice = message.member.voice
    if (!voice.channel) return channel.send(`Voce nao esta conectado em um canal de voz`)

    let url = args[0]
    if (!url) return channel.send(`Especifique uma url para ser tocada`)

    voice.channel.join()
        .then(connection => {
            console.log(`Comecando a tocar a url: ${url}`)
            play(connection, url)
        })
        .catch(err => {
            message.channel.send(`Erro ao entrar no canal de voz.`)
            console.error(err)
        })
}