const Discord = require('discord.js')

const Queue = require(`../classes/queue`)

exports.run = ( /** @type {Discord.Client} */ client, /** @type {Discord.Message} */ message, args) => {
    let guild = message.guild
    /** @type {Queue} */
    let queue = client.queues[guild.id]

    if (!queue) return;

    let page = args[0] ? args[0] : 1

    let s = page > 1 ? (page - 1) * 10 : 0
    let response = '';

    let pages = Math.floor(queue.songs.length / 10) + 1

    // Provavel que exista uma maneira de fazer isso mais "bonitamente"
    pages = pages ? pages : 1

    if (s > queue.songs.length - 1) return message.reply(`Essa pagina nao existe na queue`)

    for (let i = s; i < queue.songs.length; i++) {
        const song = queue.songs[i];

        response += `**${i + 1}. ** [\`${song.length}\`](${song.url}) ${song.title} \n`
        if (i >= s + 9) break;
    }

    message.channel.send({
            "embed": {
                "color": 7536755,
                "author": {
                    "name": `Queue | ${guild.name}`,
                    "icon_url": `${guild.iconURL({dynamic: true})}`
                },
                "fields": [{
                    "name": ".",
                    "value": `${response}\n`
                }],
                "footer": {
                    "text": `Pagina ${page}/${pages}`
                }
            }
        })
        .catch(err => console.log(`Queue error on Rich Embed send:\n${err}`))
}