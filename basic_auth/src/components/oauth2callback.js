/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class oauth2callback extends React.Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.state === 'undefined') {
            this.state = {
                username: '',
                uid: '',
                authenticated: false,
                redirect: true
            }
        }
    }

    handleResponse() {

    }

    render() {
        let userName = this.state.username;
        return (<div className="landingPage">
                    <div>
                        <MuiThemeProvider>
                            <div>
                                <p>Successfully Logged In. Welcome { userName }</p>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
    }
}