import React, { Component } from 'react';
import { connect } from 'react-redux';
import { songShow } from '../actions/songActions';
import User from '../components/User.js';
import { loadingUserInfo } from '../actions/userActions.js'

class UserContainer extends Component {

    componentDidMount(){
        this.props.loadingUserInfo(this.props.currentUser.id)
    }

    render() {
        return (
            <User user={this.props.currentUser} songs={this.props.favoriteSongs} songShow={this.props.songShow} history={this.props.history} />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUsersReducer,
        favoriteSongs: state.userReducer.songs
    }
}

export default connect(mapStateToProps, { songShow, loadingUserInfo })(UserContainer);