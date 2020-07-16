import {resetSignupForm} from "./signupForm";
import {setCurrentUser} from "./currentUsers";
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

    if (songs === 0) {
        songData = null
    } else {
        console.log("check this out", songs)
        songData = songs.map(song => {
            return {
               track: song.track,
                artist: song.artist,
                songId: song.id,
            }
        })
    }
    return {
        type: 'FETCH_SONGS',
        payload: songData
    }
}



export const fetchSongs = () => {
    return fetch(baseURL).then(response => response.json()).then(json => json.data)

}


export const addSongs = (data) => {
    return (dispatch) => {
        fetch('https://limitless-woodland-46121.herokuapp.com/api/v1/songs', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(song => sendingSongs({type:'ADD_SONG', payload:song}))
    }
}
