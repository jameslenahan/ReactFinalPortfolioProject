export const sendingSongDetails = song => {
    const songData = {
        track: song.track,
        songId: song.id,
        artist: song.artist
    }
    return {
        type: 'UPLOADING_SONG',
        payload: songData
    }
}

export const incrementFavorite = () => {
    return {
        type: 'INCREMENT_FAVORITE',
    }
}


export const settingFavorite = (numberOfLikes) => {
    return {
        type: 'LOADING_NUMBER_OF_LIKES',
        payload: numberOfLikes
    }
}

export const settingReviews = (reviewArray) => {
    return {
        type: 'LOADING_REVIEWS',
        payload: reviewArray
    }
}

export const resetFavoriteAndReview = () => {
    return {
        type: 'RESET_FAVORITE_AND_REVIEWS',
    }
}

// Display single song that a user just typed
export const displayReview = (review) => {
    return {
        type: 'DISPLAY_REVIEW',
        payload: review
    }
}


export const songShow = (apiId, history) => {

    const API_KEY = 'c7833c4cc8e1895c2a7d5a947fb15518';
    return (dispatch) => {
        fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${\'Beatles\'}&track=${cometogether}&format=json')
            .then(resp => resp.json())
            .then(song => {
                console.log(song)
                dispatch(sendingSongDetails(song))
                history.push(`/songs/${song.id}`)
                })
    }
}


export const clickLike = (song, userId, review) => {
    const HEROKU_URL = 'https://limitless-woodland-46121.herokuapp.com/api/v1/songs'
    return (dispatch) => {
        const dataForRails = {
            track: song.track,
            artist: song.artist,
            api_id: song.songId,
            favorite: {like: true, review: review,user_id: userId}
        }
        return fetch(`${HEROKU_URL}/api/v1/songs` ,{
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForRails)
        })
            .then(resp => resp.json())
            .then(song => {
                dispatch(incrementFavorite())
            })
    }
}



export const loadingFavorite = (apiId) => {
    const HEROKU_URL = 'https://limitless-woodland-46121.herokuapp.com/'
    return (dispatch) => {
        return fetch(`${HEROKU_URL}/api/v1/songs` ,{
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then(songs => { //console.log(songs)
                songs.map(song => {
                    if (song.api_id === apiId) {
                        const numberOfLikes = song.favorites.filter(fav => fav.like).length

                        let reviewArray = [];

                        song.favorites.forEach(fav => {
                            reviewArray.push({review: fav.review, username:fav.user_name})
                        })

                        //console.log("reviewArray", reviewArray)
                        dispatch(settingFavorite(numberOfLikes))
                        dispatch(settingReviews(reviewArray))
                    } else {
                        console.log("there is no matching")
                    }
                })
            })
    }
}
