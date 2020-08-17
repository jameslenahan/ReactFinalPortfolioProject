
const baseURL ="https://limitless-woodland-46121.herokuapp.com/api/v1/songs"
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


      const songsArr = Object.values(songs)
            console.log((songsArr.name))
                return {
                    track: songsArr.name,
                 //   artist: songsArr[6].name

            }

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
                    //  artist: song[7][1] // need to have this work on the second iteration when you search. will show results then.
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
        return fetch(`https://api.musixmatch.com/ws/1.1/`)
            .then(resp => resp.json())
            .then(songCollections => dispatch(sendingShowSongs((songCollections.track))))
    }
}


export const searchSongs = (state) => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    const artist = (state.artist).replace(/\s+/g, '')
    const track = (state.track).replace(/\s+/g, '')

    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`https://api.musixmatch.com/ws/1.1/`)
            .then(resp => resp.json())
            .then(songs =>

                dispatch(sendingSongs(console.log(songs.track))))
    }
}
