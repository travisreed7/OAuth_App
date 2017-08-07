/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import firebase from 'firebase';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.state === 'undefined') {
            this.state = {
                email: '',
                username: '',
                picture: '',
                authenticated: false,
                redirect: true
            }
        } else {
            this.state = {
                email: this.props.location.state.email,
                username: this.props.location.state.username,
                picture: this.props.location.state.picture,
                authenticated: this.props.location.state.authenticated,
                redirect: false
            }
        }
    }

    handleLogoff() {
        if (firebase.auth().currentUser) {
            // No user signed it with OAuth
            this.handleSignOut();
        } else {
            this.setState({
                email: null,
                username: null,
                picture: null,
                authenticated: false,
                redirect: true
            })
        }
    }

    handleSignOut() {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                this.setState({
                    uid: null,
                    username: null,
                    authenticated: false,
                    redirect: true
                })
            })
            .catch(err => console.error(err));
    }

    render() {
        let userName = this.state.username;
        let email = this.state.email;
        let picture = this.state.picture;
        let style = {width: 128, height: 128}
        return this.state.redirect ?
            (<Redirect to={{pathname: "/login", state: { username: this.state.username, authenticated: this.state.authenticated}}} push />) :
            (<div className="landingPage">
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar title="Home"/>
                            <p>Successfully Logged In. Welcome { userName }</p>
                            <p>Email is: {email}</p>
                            <img src={picture} alt="Profile" style={style}></img>
                        <br/><br/>
                        <RaisedButton label="Logoff"
                                      primary={true}
                                      onClick={() => this.handleLogoff()}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}