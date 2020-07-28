import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchSongs } from '../actions/songsActions.js';
import { songShow, resetFavoriteAndReview } from '../actions/songActions.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


class Songs extends Component {

    state = {
        song: "",
        artist: "",
        track: ""
    }

    componentDidMount(){
        this.props.resetFavoriteAndReview()
    }

    // Search recipe by keyword that a user inputs
    handleInputChange = event => {
        this.setState({
            artist: event.target.value
        })
    }

    handleTrackChange = event => {
        this.setState({
            track: event.target.value
        })
    }
    handleArtistChange = event => {
        this.setState({
            artist: event.target.value
        })
    }

    handleSongChange = event => {
        this.setState({
            song: event.target.value
        })
    }
    // Submit and search recipes from external API
    handleSubmit = event => {
        event.preventDefault()
        this.props.searchSongs(this.state)
    }


    handleClick = (apiId, history) => {
        this.props.songShow(apiId, history)
    }

    render() {

        return(
            <div className="Songs">
                <h1 style={{color: "#555"}}>Song Searcher</h1>

                <form onSubmit={this.handleSubmit} style={{margin: "6% auto"}}>
                    Add Song:
                    <TextField type="text" name="track" value={this.state.track} placeholder="ex. Come Together" onChange={this.handleTrackChange} style={{marginLeft: "10px", marginRight: "10px"}} />
                    Add Artist:
                    <TextField type="text" name="track" value={this.state.song} placeholder="ex. Beatles" onChange={this.handleSongChange} style={{marginLeft: "10px", marginRight: "10px"}} />
                    <TextField type="text" name="track" value={this.state.artist} placeholder="ex. Beatles" onChange={this.handleArtistChange} style={{marginLeft: "10px", marginRight: "10px"}} />
                    <input type="submit" value="Add" className="btn btn-full" style={{marginLeft: "15px"}}></input>
                </form>

                <GridList cols={2}>
                     (state => <GridListTile artist={this.state.artist}>=<GridListTileBar track={this.state.track}  actionIcon={
                        <IconButton onClick={() => this.handleClick(this.props.history)}>
                            <MoreHorizIcon style={{color: "#FCF3F3"}}  />
                        </IconButton>
                    }></GridListTileBar></GridListTile>) : <p></p>}
                </GridList>
            </div>
        )
    }
}

export default connect(null, { searchSongs, songShow, resetFavoriteAndReview })(Songs);