import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

    return (
        <div className="NavBar">
            <ul className="main-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/songs">Songs</Link></li>
                <li><Link to="/myaccount">My account</Link></li>
                <li><Link to="/logout">Log Out</Link></li>
            </ul>
        </div>
    )
}


export default NavBar;