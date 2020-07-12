const YtHandler = require(`./ytHandler`)
let yt = new YtHandler();

module.exports = class InputHandler {
    async parse(input) {
        // Input pode ser: Video yt, Playlist yt, Termo de pesq., Track spotf, Album spotf, Playlist spotf.

        // Extrai o nome do domino de um link ex: www.google.com = google
        let service = input.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split(".")[0].toLowerCase()

        if (service === `youtube` || service === `youtu`) {
            try {
                return await yt.parseUrl(input)
            } catch (err) {
                console.error(`Erro com ytHandler parse:\n${err}`)
            }
        } else if (service === `open`) {
            return null;
        } else {
            // Nao achamos o dominio logo eh uma pesquisa
            try {
                return await yt.getSearch(input)
            } catch (err) {
                console.error(`Erro com ytHandler search:\n${err}`)
            }
        }
    }
}