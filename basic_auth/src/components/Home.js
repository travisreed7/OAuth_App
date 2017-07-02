/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Home extends React.Component {

    render() {
        return (
            <div className="landingPage">
                <div>
                    <MuiThemeProvider>
                        <div>
                            <p>Successfully Logged In</p>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
