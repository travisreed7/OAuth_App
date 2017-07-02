import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LoginScreen from './LoginScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
        }
    }

    componentWillMount(){
        var loginPage =[];
        loginPage.push(<LoginScreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
            </div>
        );
    }
}

export default App;
