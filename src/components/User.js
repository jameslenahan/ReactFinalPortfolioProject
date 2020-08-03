import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

class User extends Component {

    handleClick = (event) => {
        this.props.songShow(event.target.dataset.apiid, this.props.history)
    }


    render() {
        const user = this.props.user
        const songs = this.props.songs
        console.log("checkit", this.props.songs)


        let favoriteText;
         if(songs !== 0){
             favoriteText =
                songs.map(song => <ListItem alignItems="flex-start"><ListItemAvatar></ListItemAvatar><ListItemText primary={`${song.track.substring(0,25)}...`} /><a href="#" onClick={this.handleClick} data-apiid={song.api_id}>More</a><Divider variant="inset" component="li" /></ListItem>)

         } else {
             favoriteText = <p>You don't have any favorite songs yet.</p>
         }


        return (
            <div className="MyAccount">
                {user ? <div><h1>Hello, {user.username}</h1><h2>Your Favorite Songs:</h2></div> : null}
                <List>{favoriteText}</List>
            </div>
        )
    }
}

export default User;