import React from 'react';
import "../App.scss";
import LogoImg from "./Logo.png";
import UserImg from "./User.png";
import Cart from "./Cart.png"
import { NavLink } from 'react-router-dom';



class Header extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
  
      }
    }
  render (){
    return (
    <div className="Navbar">
     
      <a href="/"><img className="LogoImg" src={LogoImg} /></a>
      <NavLink className="nav fa fa-home" exact to="/"> </NavLink>
      <NavLink className="nav fas fa-shopping-basket" exact to="/product"></NavLink>
      <NavLink className="nav fa fa-phone" exact to="/contact"></NavLink>
      <NavLink className="nav fa fa-question-circle" exact to="/about"></NavLink>
      <div class="topnav">
        <div class="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button className="btn fa fa-search" type="submit"></button>
          </form>
          
        </div>
        <a href="/cart" className="Cart"><img className="LogoImg"src={Cart} /></a>
      </div>
      <div>
     
    
        <ul>
     
          <li class="dropdown">
         
            <a class="dropbtn navRight">
              <a href="/user"><img src={UserImg} /></a>
              {(this.props.user.isAdmin && <a href="/dashboard" className="dropbtn fas fa-tachometer-alt" >  Dashboard</a>)}
              <a href="/user" className="dropbtn fa fa-user" >  Profile </a>
              <a href="/history" className="dropbtn fa fa-history" >  History </a>
              <NavLink className="dropbtn fas fa-sign-in-alt" to="/" onClick={() => this.props.logout()}>  Sign Out </NavLink>
            </a>
          </li>
          </ul>
        </div>
        </div>
        );
    }
};

export default Header;