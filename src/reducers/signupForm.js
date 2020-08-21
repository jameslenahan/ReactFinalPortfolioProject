export default (state = {
    username: "",
    password: ""
}, action) => {
    switch(action.type) {
        case 'UPDATE_SIGNUP_FORM':
            return action.formData
        case 'RESET_SIGNUP_FORM':
            return state
        default:
            return state
    }
}