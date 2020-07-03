import {resetSignupForm} from "./signupForm";
import {setCurrentUser} from "./currentUsers";

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

    if (songs === 0) {
        songData = null
 //   } else {
 //       songData = songs.map(song => {
  //          return {
  //              track: song.track,
    //            artist: song.artist,
     //           songId: song.id,
     //       }
    //    })
    }
    return {
        type: 'FETCH_SONGS',
        payload: songData
    }
}


////// async
export const fetchSongs = (state) => {
    const API_KEY = process.env.REACT_APP_APIKEY;
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&api_key=${API_KEY}&format=json`)
            .then(resp => resp.json())
            .then(songCollections => dispatch(sendingSongs(songCollections.songs)))
    }
}

// search query
export const searchSongs = (state) => {
    const API_KEY = process.env.REACT_APP_APIKEY;
    return (dispatch) => {
        dispatch(loadingSongs())
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${state.artist}&track=${state.track}&format=json`)
            .then(resp => resp.json())
            .then(songs => dispatch(sendingSongs(songs.results)))
    }
}
