const Discord = require('discord.js')

exports.run = ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    if (message.author.id == '181270590672338944') {
        client.ghost = client.ghost ? false : true
        if (client.ghost == true) message.delete().catch(err => console.log(err))
    }
}