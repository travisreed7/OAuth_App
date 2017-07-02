import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            authenticated: false
        }
    }

    handleClick () {
        var apiBaseUrl = "http://localhost:3000/api/";
        var payload = {
            "email":this.state.username,
            "password":this.state.password
        }
        var self = this;
        axios.post(apiBaseUrl+'login', payload)
            .then(function(response) {
                if(response.data.code === 200) {
                    // User is authenticated
                    self.setState({authenticated: true});
                    console.log("Login successful");
                }
                else if(response.data.code === 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
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
        return this.state.authenticated ?
            (<Redirect to="/home" />) :
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
                        <RaisedButton label="Submit"
                                      primary={true}
                                      style={style}
                                      onClick={() => this.handleClick()}/>
                    </div>
                </MuiThemeProvider>
            </div>);
    }
}
const style = {
    margin: 15
};

