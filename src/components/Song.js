import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickLike, displayReview, loadingFavorite } from '../actions/songActions.js';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Fab from '@material-ui/core/Fab';
import MoodIcon from '@material-ui/icons/Mood';
import CreateIcon from '@material-ui/icons/Create';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


class Song extends Component {

    state = {
        review: ""
    }


    componentDidMount() {
        this.props.loadingFavorite(this.props.song.songId)
    }


    handleClick = (song, userId) => {

        this.props.clickLike(song, userId, this.state.review)
    }

    handleInputChange = (event) => {

        this.setState({
            review: event.target.value
        })
    }

    handleSubmit = (event, song, userId) => {
        event.preventDefault()
        this.props.clickLike(song, userId, this.props.history)
        this.props.displayReview(this.state.review)
        this.setState({
            review: ""
        })
    }

    render() {


        return(
            <div className="Song">
                <GridList cellHeight={400} cols={1} style={{marginBottom: "3%"}}>
                    <GridListTile>
                        <GridListTileBar track={this.props.song.track} artistPosition="top"
                                         actionIcon={
                                             <IconButton>
                                                 <StarBorderIcon style={{color: "#FCF3F3"}} />
                                             </IconButton>
                                         }
                                         actionPosition="left">
                        </GridListTileBar>
                    </GridListTile>
                </GridList>

                <IconButton onClick={() => this.handleClick(this.props.song, this.props.userId, this.state.review)} style={{color: "#e91e63"}}><Fab style={{backgroundColor: "#f8bbd0", color: "#e91e63"}}><FavoriteBorderIcon /></Fab><span style={{fontSize: "1.2rem"}}>&nbsp;Love:&nbsp;{this.props.favorite}</span></IconButton>

                <h3>Recommended reviews:</h3>
                {this.props.reviews.length === 0 ? <p>Write a first review!</p> : this.props.reviews.map(review => <p><IconButton><MoodIcon /></IconButton>{review.review} by {review.username}</p>)}

                <h5 style={{marginTop: "1%"}}><IconButton><EmojiEmotionsIcon /></IconButton>{this.props.review ? `${this.props.currentUser}: ${this.props.review}` : null}</h5>

                <form onSubmit={(event) => this.handleSubmit(event, this.props.song, this.props.userId)}>
                    <TextField type="text" name="review" value={this.state.review} onChange={this.handleInputChange} label="Your Review"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <CreateIcon />
                                       </InputAdornment>
                                   ),
                               }}/>
                    <Button type="submit" size="small" style={{color: "#e91e63"}} variant="outlined">Add Review</Button>
                </form>

                <button onClick={this.props.history.goBack}style={{margin: "3% 0"}}><KeyboardBackspaceIcon /><span style={{fontSize: "1rem"}}>Back</span></button>


                <button onClick={this.props.history.goBack}style={{margin: "3% 0"}}><KeyboardBackspaceIcon /><span style={{fontSize: "1rem"}}>Back</span></button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songReducer.song,
        userId: state.currentUsersReducer.id,
        favorite: state.songReducer.favorite,
        reviews: state.songReducer.reviews,
        review: state.songReducer.review,
        currentUser: state.currentUsersReducer.username
    }
}

export default connect(mapStateToProps, { clickLike, displayReview, loadingFavorite })(Song);