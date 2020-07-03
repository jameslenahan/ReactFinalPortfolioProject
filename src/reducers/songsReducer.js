
export default (state = {
    loading: false,
    songs: null
}, action) => {
    //console.log("RecipeReducer:", action.type, action.payload)
    switch(action.type) {
        case 'LOADING_SONGS':
            return {...state, loading: true}

        case 'FETCH_SONGS':
            return {loading: false, songs: action.payload}

        case 'RESET_SONGS':
            return {loading: false, songs: null}

        default:
            return state
    }
}