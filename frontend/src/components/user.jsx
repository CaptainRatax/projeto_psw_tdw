import React from 'react';
import Header from "./header";
import Ted from "../components/tedUser.png";
import { NavLink } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="background">
        <Header user={this.props.user} logout={this.props.logout} />
        <div className="dashboard"><h1>Profile</h1></div>
        <div class="page">
          <div class="page__container">
            <article class="profile">
              <header class="profile__header">
                <img src={this.props.user.image} />
                <h3 class="profile__name">{this.props.user.name}</h3>
              </header>
              <div class="profile__stats">
                <div class="profile__group">
                  <span class="profile__value">Member since</span>
                  <span class="profile__param">{this.getDate(this.props.user.createdAt)}</span>
                </div>
                <div class="profile__group">
                  <span class="profile__value">Number</span>
                  <span class="profile__param">{this.props.user.nMec}</span>
                </div>
                <div class="profile__group">
                  <span class="profile__value">Admin</span>
                  <span class="profile__param">{this.getAdmin()}</span>
                </div>
              </div>
              <footer class="profile__socials">
                <a href="/" class="profile__social">
                  <div className="profile__social-icon fa fa-user"></div>
                </a>
                <a href="/history" className="profile__social">
                  <div className="profile__social-icon fa fa-history"></div>
                </a>
                <a to="/" onClick={() => this.props.logout()} class="profile__social">
                  <div className="profile__social-icon fas fa-sign-in-alt"></div>
                </a>
              </footer>
            </article>
          </div>
        </div>
      </div>



    )
  }
  getDate(date) {
    var fulldate = new Date(date).toISOString();
    var date = fulldate.split('T')[0];
    date = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
    return date;
  }
  getAdmin() {
    var value;
    if (this.props.user.isAdmin){
      value="Yes";
      return value;
    }else{
      value="No";
      return value;
    }
  }
}




export default User;