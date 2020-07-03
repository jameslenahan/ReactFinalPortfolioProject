import { combineReducers } from 'redux';
import songsReducer from './songsReducer.js';
import songReducer from './songReducer.js';
import currentUsersReducer from './currentUsersReducer.js';
import loginForm from './loginForm.js'
import signupForm from './signupForm.js'
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
    songsReducer,
    currentUsersReducer,
    loginForm,
    signupForm,
    songReducer,
    userReducer
})

export default rootReducer