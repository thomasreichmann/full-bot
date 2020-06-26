const Discord = require('discord.js')

module.exports = (/** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message) => {
    console.log(`Inicializacao finalizada, perfil: ${client.user.tag}`)
}