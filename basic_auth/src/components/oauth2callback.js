/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import axios from 'axios';
import QueryString from 'querystring';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const CLIENT_ID = '824507396066-s1r70vqic9a066aupejvvm61h0ouvtpa.apps.googleusercontent.com';
const CLIENT_SECRET = '6UoA4qsy1SMAMutIMbZ-CCrj';
let REDIRECT_URI;

if(process.env.NODE_ENV === 'production') {
    REDIRECT_URI = "https://oauth-treed.herokuapp.com/oauth2callback";
} else {
    REDIRECT_URI = "http://localhost:3001/oauth2callback";
}

export default class oauth2callback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            picture: '',
            authenticated: false,
            redirect: false
        }
    }

    componentWillMount() {
        this.handleResponse();
    }

    handleResponse() {
        let tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';
        let urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');

        let data={
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code'
        }
        let self = this;
        axios.post(tokenEndpoint, QueryString.stringify(data))
            .then(function (response) {
                if(response.status === 200){
                    console.log(response);
                    let config = {
                        headers: {'Authorization': 'Bearer '+response.data.access_token}
                    };
                    console.log(config);
                    axios.get('https://www.googleapis.com/oauth2/v2/userinfo', config)
                        .then(function (response) {
                            if(response.status === 200){
                                console.log(response);
                                self.setState({redirect: true, email: response.data.email, name: response.data.name, picture: response.data.picture, authenticated: true})
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return this.state.redirect ?
            (<Redirect to={{pathname: "/home", state: { username: this.state.name, email: this.state.email, picture: this.state.picture, authenticated: this.state.authenticated}}} push />) :
            (<div className="landingPage">
                <div>
                    <MuiThemeProvider>
                        <div>
                            <p>Processing googles response... </p>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>);
    }
}