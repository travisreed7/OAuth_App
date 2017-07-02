/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';

export default class LoginScreen extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            username: '',
            password: '',
            buttonLabel: 'Register',
            redirect: false
        }
    }

    handleClick() {
        this.setState({redirect: true});
    }

    render() {
        return this.state.redirect ?
            (<Redirect to="/register" />) :
            (<div className="loginscreen">
                <Login/>
                <div>
                    <p>Not registered yet? Go to the registration page.</p>
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={() => this.handleClick()}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
const style = {
    margin: 15,
};