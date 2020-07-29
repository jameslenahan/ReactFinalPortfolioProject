import {resetSignupForm} from "./signupForm";
import {setCurrentUser} from "./currentUsers";
const baseURL ="https://limitless-woodland-46121.herokuapp.com/api/v1/songs"
export const loadingSongs = () => {
    return {
        type: 'LOADING_SONGS'
    }
}

// export const resetSongs = () => {
   //  return {
      //   type: 'RESET_SONGS'
    // }
// }

export const sendingSongs = songs => {
    let songData;
    console.log("isehfo", songs)
    if (songs === 0) {
        songData = null
    } else {
        songData = songs.map(song => {
            return {
               track: song.name,
                artist: song.artist.name,
                songId: song.mbid,
            }
        })
    }
    return {
        type: 'FETCH_SONGS',
        payload: songData
    }
}



export const fetchSongs = (state) => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json}`)
            .then(resp => resp.json())
            .then(songCollections => dispatch(sendingSongs(songCollections.songs)))
    }
}


export const searchSongs = (state) => {
    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${'Beatles'}&track=${'cometogether'}&format=json`)
            .then(resp => resp.json())
            .then(songs => dispatch(sendingSongs(songs)))
    }
}
