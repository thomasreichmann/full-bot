const Discord = require('discord.js')

exports.run = ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let delay = checkNull(args[0], 0)

    setTimeout(() => {
        message.reply(`Pong! ${(message.createdAt.valueOf() + (delay * 2)) - new Date().valueOf()}ms`)
    }, delay)
}