import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Register extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            redirect: false
        }
    }

    handleClick () {
        let apiBaseUrl;
        if(process.env.NODE_ENV === 'production') {
            apiBaseUrl = "https://base-auth-backend.herokuapp.com/api/";
        } else {
            apiBaseUrl = "http://localhost:3000/api/";
        }

        let self = this;
        console.log("values: ",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done: Check for empty values before hitting submit
        let payload={
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'register', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    console.log("registration successful");
                    self.setState({redirect: true});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return this.state.redirect ?
            (<Redirect to="/login" push />) :
            (<div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={() => this.handleClick()}/>
                        <div>
                            <p>Already Registered? Go to the login page.</p>
                            <RaisedButton label="Login" primary={true} style={style} onClick={() => this.setState({redirect: true})}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

Register.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    redirect: PropTypes.bool
}

const style = {
    margin: 15,
};