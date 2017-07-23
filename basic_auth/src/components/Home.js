/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.state === 'undefined') {
            console.log("undefined");
            this.state = {
                username: '',
                uid: '',
                authenticated: false,
                redirect: true
            }
        } else {
            this.state = {
                username: this.props.location.state.username,
                uid: this.props.location.state.uid,
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
                uid: null,
                username: null,
                authenticated: false,
                redirect: true
            })
        }
    }

    handleSignOut() {
        console.log("Oauth sign out");
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
        return this.state.redirect ?
            (<Redirect to={{pathname: "/login", state: { username: this.state.username, uid: this.state.uid, authenticated: this.state.authenticated}}} push />) :
            (<div className="landingPage">
                <div>
                    <MuiThemeProvider>
                        <div>
                            <p>Successfully Logged In. Welcome { userName }</p>
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