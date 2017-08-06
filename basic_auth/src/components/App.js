import React from 'react';
import LoginScreen from './LoginScreen';
import Home from './Home';
import Register from './Register';
import Oauth2Callback from './oauth2callback';
import NotFound from './NotFound';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={LoginScreen} />
                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/oauth2callback" component={Oauth2Callback} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
