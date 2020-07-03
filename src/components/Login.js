import React from 'react'
import { connect } from 'react-redux';
import { updateLoginForm }from '../actions/loginForm.js';
import { login } from '../actions/currentUsers.js';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const Login = ({loginData, updateLoginForm, login, history}) => {

    function handleChange(event) {
        return updateLoginForm({...loginData, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        login(loginData, history)
    }

    const handleClick = event => {
        event.preventDefault()
        history.goBack()
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <section>
                    <TextField
                        type="text"
                        value={loginData.username}
                        name="username"
                        onChange={handleChange}
                        label="username"
                        variant="outlined"
                        style={{backgroundColor: "#FCF3F3"}} />

                    <TextField
                        type="password"
                        value={loginData.password}
                        name="password"
                        onChange={handleChange}
                        label="password"
                        variant="outlined"
                        style={{backgroundColor: "#FCF3F3", marginLeft: "1%"}}  />

                    <input
                        type="submit"
                        value="Log In"
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
        loginData: state.loginForm
    }
}

export default connect(mapStateToProps, { updateLoginForm, login })(Login);