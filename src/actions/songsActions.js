
export const loadingSongs = () => {
    return {
        type: 'LOADING_SONGS'
    }
}

export const resetSongs = () => {
    return {
         type: 'RESET_SONGS'
     }
}

export const sendingSongs = songs => {
    let songData;
    if (songs.length === 0) {
        songData = null
    }

    else {

        console.log(songs)
        songData = songs.forEach(song => {
            console.log(song.mbid)
            return {
                track: song.name,
                artist: song.artist.name,
                songId: song.mbid,




            }
            }


        )
    }
    return {

        type: 'FETCH_SONGS',
        payload: songData
    }
}

export const sendingShowSongs = songs => {
    let songData;

    if (songs === 0) {
        songData = null
    }

    else {
        const songsArr = Object.entries(songs)
        songData = songsArr.map(song => {
                return {
                    track: song[1].name
                }
            }


        )
    }
    return {

        type: 'FETCH_SONGS',
        payload: songData
    }
}



export const fetchSongs = () => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=beatles&track=cometogether&api_key=${API_KEY}&format=json`)
            .then(resp => resp.json())
            .then(songCollections => dispatch(sendingShowSongs((songCollections.similartracks.track))))
    }
}


export const searchSongs = (state) => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    const artist = (state.artist).replace(/\s+/g, '')
    const track = (state.track).replace(/\s+/g, '')

    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${track}&format=json`)
            .then(resp => resp.json())
            .then(songs =>

                dispatch(sendingSongs(songs.track)))
    }
}
