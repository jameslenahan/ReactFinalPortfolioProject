import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedin, component: Component, ...props}) => {
    return (
        <Route {...props}
               render={property => {
                   if (loggedin) {
                       return <Component {...property} />
                   } else {
                       return <Redirect to={
                           {
                               pathname: "/",
                               state: {
                                   from: property.location
                               }
                           }
                       }/>
                   }
               }} />
    )
}

const mapStateToProps = state => {
    const status = state.currentUsersReducer === null || state.currentUsersReducer.error ? false : true
    return {
        loggedin: status
    }
}

export default connect(mapStateToProps)(ProtectedRoute);