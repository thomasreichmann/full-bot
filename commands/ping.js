const Discord = require('discord.js')
const Functions = require(`../functions`)
const fn = new Functions()

exports.run = ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let delay = fn.checkNull(args[0], 0)

    setTimeout(() => {
        message.reply(`Pong! ${(message.createdAt.valueOf() + (delay * 2)) - new Date().valueOf()}ms`)
    }, delay)
}