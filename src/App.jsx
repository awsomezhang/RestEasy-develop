import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';


const Landing = lazy(() => import('./views/Landing/Landing'));
const Routes = lazy(() => import('./routes/Routes'));
const Signup = lazy(() => import('./views/SignUp/SignUp'));
const Login = lazy(() => import('./views/Login/Login'));
const Contact = lazy(() => import('./views/Contact/Contact'));



class App extends Component {
    render() {
        const PrivateRoute = ({component: Component, authed, ...rest}) => {
            return (
                <Route
                    {...rest}
                    render={
                        (props) => authed
                            ? <Component {...rest} />
                            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    }
                />
            )
        };
        return (
            <div>
                <BrowserRouter>
                <Suspense
                    fallback={
                        <div
                            style={{
                                textAlign: 'center',
                                height: '361.88px',
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            Loading...
                        </div>
                    }
                >
                    <Switch>
                        <Route exact path="/" component={withRouter(Landing)}/>
                        <Route exact path="/login" component={withRouter(Login)}/>
                        <Route exact path="/contact" component={withRouter(Contact)}/>
                        <Route exact path="/signup" component={withRouter(Signup)}/>
                        <PrivateRoute authed={localStorage.getItem('access_token')} path="/my" component={Routes}/>
                    </Switch>
                </Suspense>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
