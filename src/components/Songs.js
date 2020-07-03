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
        artist: "",
        song: ""
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

    // Submit and search recipes from external API
    handleSubmit = event => {
        event.preventDefault()
        this.props.searchSongs(this.state)
    }

    // Move to Recipe Show page.
    handleClick = (apiId, history) => {
        this.props.songShow(apiId, history)
    }

    render() {

        return(
            <div className="Songs">
                <h1 style={{color: "#555"}}>Song Searcher</h1>

                <form onSubmit={this.handleSubmit} style={{margin: "6% auto"}}>
                    Search Song:
                    <TextField type="text" name="track" value={this.state.track} placeholder="ex. Come Together" onChange={this.handleTrackChange} style={{marginLeft: "10px", marginRight: "10px"}} />
                    Search Artist:
                    <TextField type="text" name="artist" value={this.state.artist} placeholder="ex. The Beatles" onChange={this.handleInputChange} style={{marginLeft: "10px", marginRight: "10px"}} />


                    <input type="submit" value="Search" className="btn btn-full" style={{marginLeft: "15px"}}></input>
                </form>

                <GridList cols={2}>
                    {this.props.songs!== null ? this.props.songs.map(song => <GridListTile key={song.artist}>=<GridListTileBar title={song.track}  actionIcon={
                        <IconButton onClick={() => this.handleClick(song.songId, this.props.history)}>
                            <MoreHorizIcon style={{color: "#FCF3F3"}}  />
                        </IconButton>
                    }></GridListTileBar></GridListTile>) : <p>No songs found. Please try with another keyword.</p>}
                </GridList>
            </div>
        )
    }
}

<GridList cols={2}>
    {this.props.songs!== null ? this.props.songs.map(song => <GridListTile key={song.artist}>=<GridListTileBar title={song.track}  actionIcon={
        <IconButton onClick={() => this.handleClick(song.songId, this.props.history)}>
            <MoreHorizIcon style={{color: "#FCF3F3"}}  />
        </IconButton>
    }></GridListTileBar></GridListTile>) : <p>No songs found. Please try with another keyword.</p>}
</GridList>
</div>
)
}
}

export default connect(null, { searchSongs, songShow, resetFavoriteAndReview })(Songs);