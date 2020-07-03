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


export const songShow = (history, song) => {
    const API_KEY = process.env.REACT_APP_APIKEY;
    const artist = song.artist
    const track = song.track


    //console.log("fire on show", apiId)
    return (dispatch) => {
        return fetch("https://lastfmdimashirokovv1.p.rapidapi.com/searchTracks", {
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "LastFmdimashirokovV1.p.rapidapi.com",
                "x-rapidapi-key": "62e252c02dmsh263aff2b0ce4b96p12fd14jsnf59138f06682",
                "content-type": "application/x-www-form-urlencoded"
            },
            "body": {}
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

//Click "like" button - post likes and review
export const clickLike = (song, userId, review) => {
    //console.log("fire clickLike", song, userId, review)
    // const HEROKU_URL = process.env.REACT_APP_HEROKU
    const HEROKU_URL = 'https://limitless-woodland-46121.herokuapp.com/'
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


//Loading total number of Likes if a recipe has favorites
export const loadingFavorite = (apiId) => {
    //console.log("fire loading Favorite", apiId)
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

// title = artist
