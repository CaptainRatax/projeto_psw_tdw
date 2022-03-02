import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './home';
import Product from "./product";
import About from "./about";
import Contact from "./contact";
import Dashboard from "./dashboard";
import Dashboard1 from "./dashboard1";
import Dashboard2 from "./dashboard2";
import History from "./history"
import Cart from "./cart";
import User from "./user";
import PageNotFound from './404';
import Header from './header';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header user={this.props.user} logout={this.props.logout}></Header>
                <BrowserRouter>
                    <Switch>
                        <Route exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                        <Route exact path={"/cart"}
                            render={props => (
                                <Cart
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                         <Route exact path={"/user"}
                            render={props => (
                                <User
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                        <Route exact path={"/product"}
                            render={props => (
                                <Product
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                        <Route exact path={"/about"}
                            render={props => (
                                <About
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                            <Route exact path={"/Contact"}
                            render={props => (
                                <Contact
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                          {(this.props.user.isAdmin && <Route exact path={"/dashboard"}
                            render={props => (
                                <Dashboard
                                    {...props}  user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />)}
                        {(this.props.user.isAdmin && <Route exact path={"/dashboard1"}
                            render={props => (
                                <Dashboard1
                                    {...props}  user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />)}
                           {(this.props.user.isAdmin && <Route exact path={"/dashboard2"}
                            render={props => (
                                <Dashboard2
                                    {...props}  user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />)}
            
                        <Route exact path={"/history"}
                            render={props => (
                                <History
                                    {...props} user={this.props.user} logout={this.props.logout} isLogged={this.state.isLogged}
                                />
                            )}
                        />
                        <Route exact path={"/404"} render={() => <PageNotFound isLogged={this.props.isLogged}></PageNotFound>} />
                        <Redirect to={"/404"} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

    componentDidMount() {

        if (!this.props.isLogged) {
            this.props.history.push("/login");
        }
    }
}