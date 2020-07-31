import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../components/Songs.js';
import { fetchSongs } from '../actions/songsActions.js';


class RandomSongsContainer extends Component {
    componentDidMount(){
        this.props.fetchSongs()
    }

    render() {
        return (
            <div>
                <Songs songs={this.props.songs} history={this.props.history} />
            </div>
        )
    }
}


export default connect((state)=>({songs: state.songsReducer.songs}), { fetchSongs })(RandomSongsContainer)