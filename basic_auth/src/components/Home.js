/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: this.props.location.state.username,
            redirect: false
        }
    }

    handleClick() {
        this.setState({redirect: true});
    }

    handleLogoff() {
        this.setState({username: ''});
        this.setState({redirect: true});
    }

    render() {
        let userName = this.state.username;
        return this.state.redirect ?
            (<Redirect to="/login" push/>) :
            (<div className="landingPage">
                <div>
                    <MuiThemeProvider>
                        <div>
                            <p>Successfully Logged In. Welcome { userName }</p>
                        <br/>
                        <RaisedButton label="Return to Login Page"
                                      primary={true}
                                      onClick={() => this.handleClick()}/>
                        <br/>
                            <br />
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