const Discord = require('discord.js')
const Queue = require('../classes/queue')

exports.run = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let guild = message.guild
    /** @type {Queue} */
    let queue = client.queues[guild.id]

    if (!queue) return;

    message.channel.send(queue.np())
}