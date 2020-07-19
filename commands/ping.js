const Discord = require('discord.js')
const Functions = require(`../functions`)
const fn = new Functions()

exports.run = ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let delay = fn.checkNull(args[0], 0)
    let beforeTime = message.createdTimestamp

    setTimeout(async () => {
        let m = await message.channel.send(`Pong! Calculando delay...`)
        let afterTime = m.createdTimestamp

        m.edit(`Pong! ${afterTime - beforeTime}ms`)
    }, delay)
}