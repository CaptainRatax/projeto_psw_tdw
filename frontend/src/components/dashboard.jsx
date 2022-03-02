import React from 'react';
import Header from "./header";
import { NavLink } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
 <div>
  <Header user={this.props.user} logout={this.props.logout} /> 
  <div className="dashboard">
    <h1>Dashboard <p>Use your admin powers to edit this Website</p></h1>
  <NavLink className="navD fa fa-user" exact to="/dashboard1"> </NavLink>
  <NavLink className="navD fa fa-shopping-cart" exact to="/dashboard2"> </NavLink>
  <a href="/history" className="navD fa fa-history" >  </a>
  <NavLink className="navD fas fa-sign-in-alt" to="/" onClick={() => this.props.logout()}></NavLink>
  </div>
</div>
 


    );
  };
};

export default Dashboard;