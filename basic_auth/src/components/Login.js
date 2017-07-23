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
                console.log("if");
                console.log("mounted calling authHandler");
                //this.authHandler(user);
            }
            else {
                console.log("else");
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
            console.log("signing user out");
            this.handleSignOut();
        }
    }

    authenticate(provider) {
        console.log("authenticate calling authHandler");
        firebase.auth().signInWithPopup(provider)
            .then(this.authHandler)
            .catch(err => console.error(err))
    }

    authHandler = (authData) => {
        //console.log(authData);
        let user = authData.user || authData;
        this.setState({
            uid: user.uid,
            username: user.displayName,
            authenticated: true
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
        let apiBaseUrl;
        if(process.env.NODE_ENV === 'production') {
            apiBaseUrl = "https://base-auth-backend.herokuapp.com/api/";
        } else {
            apiBaseUrl = "http://localhost:3000/api/";
        }

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
                    console.log("Login successful");
                }
                else if(response.data.code === 204) {
                    console.log("The email or password you entered is invalid");
                    alert("The email or password you entered is invalid")
                }
                else{
                    console.log("Username does not exist");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        console.log(this.state.authenticated);
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
                    </div>
                </MuiThemeProvider>
            </div>);
    }
}
const style = {
    margin: 15
};


