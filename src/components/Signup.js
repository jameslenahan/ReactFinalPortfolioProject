import React from 'react'
import { connect } from 'react-redux';
import { updateSignupForm }from '../actions/signupForm.js';
import { signup } from '../actions/currentUsers.js';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const Signup = ({signupData, updateSignupForm, signup, history}) => {

    const handleChange = event => {
        updateSignupForm({...signupData, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        signup(signupData, history)
    }

    const handleClick = event => {
        event.preventDefault()
        history.goBack()
    }

    return (
        <div className="Signup">
            <form onSubmit={handleSubmit}>
                <section>
                    <TextField
                        type="text"
                        value={signupData.username}
                        name="username"
                        onChange={handleChange}
                        label="username"
                        variant="outlined"
                        style={{backgroundColor: "#FCF3F3"}} />

                    <TextField
                        type="password"
                        value={signupData.password}
                        name="password"
                        onChange={handleChange}
                        label="password"
                        variant="outlined"
                        style={{backgroundColor: "#FCF3F3", marginLeft: "1%"}} />

                    <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-ghost"
                        style={{marginLeft: "1.5%", marginTop: "6px"}}>
                    </input>

                </section>

                <p onClick={handleClick}>
                    <Fab className="closeBtn"><CloseIcon/></Fab>
                </p>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        signupData: state.signupForm
    }
}

export default connect(mapStateToProps, { updateSignupForm, signup })(Signup);