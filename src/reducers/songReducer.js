export default (state = {
    song: null,
    favorite: 0,
    artists: [],
    artist: ""
}, action) => {
    //console.log("SongReducer:", action.type, action.payload)
    switch(action.type) {
        case 'ADD_SONG':
            return {...state, songs: action.payload}
        case 'UPLOADING_SONG':
            return {...state, song: action.payload}

        case 'INCREMENT_FAVORITE':
            return {...state, favorite: +1 }

        case 'RESET_SONG':
            return {song: null, favorite: 0}

        case 'LOADING_NUMBER_OF_LIKES':
            return {...state, favorite: action.payload}

        case 'LOADING_REVIEWS':
            return {...state, artists: action.payload}

        case 'RESET_FAVORITE_AND_REVIEWS':
            return {favorite: 0, reviews: []}

        case 'DISPLAY_REVIEW':
            return {...state, artist: action.payload}

        default:
            return state
    }
}