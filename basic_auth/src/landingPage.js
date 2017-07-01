/**
 * Created by travisreed7 on 6/25/17.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class landingPage extends React.Component {
    constructor (props) {
        super(props);
    }

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
const style = {
    margin: 15,
};