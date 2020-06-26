const Discord = require('discord.js')
const Functions = require(`../functions.js`)
let fn = new Functions()

exports.run = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let guild = message.guild.members.cache.array()

    let member = guild[Math.floor(fn.random(guild.length))]

    message.channel.send(`A pessoa da vez: <@${member.id}>`)
}