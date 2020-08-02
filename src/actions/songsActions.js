
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


      const songsArr = Object.entries(songs)
       console.log(songsArr)
        songData = songsArr.map(song => {
            return {
                artist: song[1],
                track: song[0][0, 1, 2, 3]

            }
        }
        )


   //         if (song[1] === song[1] instanceof Object)
        //        return {
     //               track: song[1].name
      //          }
    //        else
       //         return {

            //        track: song[1]
                    //  artist: song[7][1] // need to have this work on the second iteration when you search. will show results then.
           //     }




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
        console.log(songsArr)
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
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=beatles&track=cometogether&api_key=${API_KEY}&format=json`)
            .then(resp => resp.json())
            .then(songCollections => dispatch(sendingShowSongs((songCollections.similartracks.track))))
    }
}


export const searchSongs = (state) => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${state.artist}&track=${state.track}&format=json`)
            .then(resp => resp.json())
            .then(songs =>

                dispatch(sendingSongs(songs.track)))
    }
}
