const Song = require(`./song`)
const YtHandler = require(`./ytHandler`);

let ytHandler = new YtHandler()

const Spotify = require('spotify-web-api-node');

let spotify = new Spotify({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_TOKEN
});

module.exports = class SpotifyHandler {
    async parseUrl(url) {
        try {
            await this.setToken()

            let index = url.search(/(playlist|track|album)/)
            let parsed = url.substr(index).split("/")
            // Define se temos um playlist|track|album
            let type = parsed[0]
            // Define o id da playlist|track|album
            let id = parsed[1]

            if (type === `track`) {
                return await this.getTrack(id)
            } else if (type === `playlist`) {
                return await this.getPlaylist(id)
            } else {

            }

        } catch (error) {
            console.log(error)
        }
    }

    async getTrack(id) {
        try {
            let data = await spotify.getTrack(id)

            let title = data.body.name;
            let artist = data.body.artists[0].name

            let query = `${artist} ${title}`

            return await ytHandler.getSearch(query)
        } catch (err) {
            console.erro(`Erro getTrack spHandler:\n${err}`)
        }
    }

    async getPlaylist(id) {
        try {
            let data = await spotify.getPlaylist(id)
            let queries = []

            data.body.tracks.items.forEach(t => {
                let track = t.track

                let title = track.name;
                let artist = track.artists[0].name

                queries.push(`${artist} ${title}`)
            })

            return await this.searchTracks(queries)
        } catch (err) {
            console.error(`Erro getPlaylist spHandler:\n${err}`)
        }
    }

    getAlbum() {

    }

    async searchTracks(queries) {
        let calls = []

        queries.forEach(q => {
            calls.push(ytHandler.getSearch(q))
        })

        let songs = await Promise.all(calls)

        return songs.flat()
    }

    async setToken() {
        try {
            let data = await spotify.clientCredentialsGrant();

            spotify.setAccessToken(data.body.access_token);
        } catch (err) {
            console.log('Something went wrong when retrieving an access token', err);
            return false;
        }
    }
}