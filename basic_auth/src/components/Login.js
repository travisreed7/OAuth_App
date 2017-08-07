import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCcLb6NecLHqgkERfRdm5agPvNEzSCMOVQ",
    authDomain: "treedoauth.firebaseapp.com",
    databaseURL: "https://treedoauth.firebaseio.com",
    projectId: "treedoauth",
    storageBucket: "treedoauth.appspot.com",
    messagingSenderId: "1011245732324"
};

let REDIRECT_URI;
if(process.env.NODE_ENV === 'production') {
    REDIRECT_URI = "https://oauth-treed.herokuapp.com/oauth2callback";
} else {
    REDIRECT_URI = "http://localhost:3001/oauth2callback";
}

let apiBaseUrl;
if(process.env.NODE_ENV === 'production') {
    apiBaseUrl = "https://base-auth-backend.herokuapp.com/api/";
} else {
    apiBaseUrl = "http://localhost:3000/api/";
}

this.app = firebase.initializeApp(config);

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            uid: '',
            authenticated: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)  => {
            if (user) {
                //this.authHandler(user);
            }
            else {
                // No user logged in with OAuth
            }
        })
    }

    toggleSignIn(authProvider) {
        if(!firebase.auth().currentUser) {
            if (authProvider === "google") {
                const provider = new firebase.auth.GoogleAuthProvider();
                this.authenticate(provider);
            }
        } else {
            this.handleSignOut();
        }
    }

    toggleOAuth() {
        let client_id='824507396066-s1r70vqic9a066aupejvvm61h0ouvtpa.apps.googleusercontent.com';

        if (!this.state.authenticated) {
            let url = 'https://accounts.google.com/o/oauth2/v2/auth?scope=email+profile&access_type=offline&include_granted_scopes=true&&redirect_uri='+REDIRECT_URI+'&response_type=code&client_id='+client_id;
            window.location.href=url;
        } else {
            this.handleOAuthSignOut();
        }
    }

    authenticate(provider) {
        firebase.auth().signInWithPopup(provider)
            .then(this.authHandler)
            .catch(err => console.error(err))
    }

    authHandler = (authData) => {
        let user = authData.user || authData;
        this.setState({
            uid: user.uid,
            username: user.displayName,
            authenticated: true
        });
    }

    handleOAuthSignOut() {
        this.setState({
            uid: null,
            username: null,
            authenticated: false
        });
    }

    handleSignOut() {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                this.setState({
                    uid: null,
                    username: null,
                    authenticated: false
                })
            })
            .catch(err => console.error(err));
    }

    handleClick () {
        let payload = {
            "email":this.state.username,
            "password":this.state.password
        }
        let self = this;
        axios.post(apiBaseUrl+'login', payload)
            .then(function(response) {
                if(response.data.code === 200) {
                    // User is authenticated
                    self.setState({authenticated: true});
                }
                else if(response.data.code === 204) {
                    alert("The email or password you entered is invalid")
                }
                else{
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.error(error);
            });

    }

    render() {
        return this.state.authenticated ?
            (<Redirect to={{pathname: "/home", state: { username: this.state.username, uid: this.state.uid, authenticated: this.state.authenticated}}} push />) :
            (<div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <TextField
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username: newValue})}/>
                        <br/>
                        <TextField
                            type="Password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            onChange = {(event, newValue) => this.setState({password: newValue})}/>
                        <br/>
                        <RaisedButton label="Login"
                                      primary={true}
                                      style={style}
                                      onClick={() => this.handleClick()}/>
                        <br/>
                        <RaisedButton label="Login With google"
                                      className="google"
                                      style={style}
                                      labelColor="#ffffff"
                                      backgroundColor="#dd4b39"
                                      onClick={this.toggleSignIn.bind(this, "google")}>
                        </RaisedButton>
                        <br/>
                        <RaisedButton label="Login With my OAuth"
                                      className="google"
                                      style={style}
                                      labelColor="#ffffff"
                                      backgroundColor="#dd4b39"
                                      onClick={() => this.toggleOAuth()}>
                        </RaisedButton>
                    </div>
                </MuiThemeProvider>
            </div>);
    }
}
const style = {
    margin: 15
};


