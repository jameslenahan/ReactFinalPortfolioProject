export default (state = {
    songs: []
    }, action) => {
        switch (action.type) {
        case 'UPLOADING_FAVORITE':
            return {...state, songs: action.payload}

        default:
            return state
    }
}