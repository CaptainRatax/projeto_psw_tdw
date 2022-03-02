import React from 'react';
import Header from "./header";
import UserImg from "./User.png";
import { NavLink } from 'react-router-dom';
import sha1 from 'sha1';
import { createUser, getAllUsers, deleteUserId, getUserById, editUser } from '../api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUser: {
        nMec: "",
        name: "",
        password: "",
        image: "",
        isAdmin: false
      },
      edit: false,
      newUserSuccess: false,
      error: false,
      deleteOk: false
    }
  }

  handlerNew = (e) => {
    var user = this.state.newUser;
    if (e.target.name === "password") {
      user[e.target.name] = sha1(e.target.value);
    } else {
      user[e.target.name] = e.target.value;
    }
    this.setState({ newUser: user });
  }

  handlerNewSubmit = (e) => {
    e.preventDefault();
    if (!this.state.edit) { //if not edit
      createUser(this.state.newUser).then(result => {
        if (result.ok) {
          this.setState({
            newUserSuccess: true,
            error: false
          });
          getAllUsers().then(result => {
            this.setState({
              users: result
            })
          })
          document.getElementById("formSubmitUser").reset();
          setTimeout(() => {
            this.setState({
              newUserSuccess: false
            });
          }, 1500);
        } else {
          this.setState({
            error: true,
            newUserSuccess: false
          });
        }
      });
    } else { //if edit
      console.log(this.state.newUser);
      editUser(this.state.newUser).then(result => {
        if (result.ok) {
          this.setState({
            newUserSuccess: true,
            error: false
          });
          getAllUsers().then(result => {
            this.setState({
              users: result
            })
          })
          document.getElementById("formSubmitUser").reset();
          setTimeout(() => {
            this.setState({
              newUserSuccess: false
            });
          }, 1500);
        } else {
          this.setState({
            error: true,
            newUserSuccess: false
          });
        }
      });
    }
  }

  editUser = (id) => {
    document.getElementById("title").innerHTML = "Edit User";
    getUserById(id).then(result => {
      this.setState({
        edit: true,
        newUser: {
          _id: result._id,
          nMec: result.nMec,
          name: result.name,
          password: result.password,
          image: result.image,
          isAdmin: result.isAdmin
        }
      })
    })
  }

  deleteUser = (id, index) => {
    if (window.confirm("Are you sure you want to delete?")) {
      var users = this.state.users;
      deleteUserId(id).then(result => {
        if (result.ok) {
          users.splice(index, 1);
          this.setState({
            users,
            deleteOk: true
          });
          setTimeout(() => {
            this.setState({
              deleteOk: false
            });
          }, 1500);
        }
      });
    }
  }


  render() {
    return (
      <div>
        <Header user={this.props.user} logout={this.props.logout} />
        <div className="dashboard"><h1>USER SETTINGS<p>Use your admin powers to edit this Website</p></h1>
          <NavLink className="navD 	fas fa-arrow-alt-circle-left" exact to="/dashboard"> </NavLink>
          <NavLink className="navD fa fa-shopping-cart" exact to="/dashboard2"> </NavLink>
          <a href="/history" className="navD fa fa-history" >  </a>
          <NavLink className="navD fas fa-sign-in-alt" to="/" onClick={() => this.props.logout()}></NavLink>
        </div>

        <div className="dashR">
          <h1>List of User</h1>
          {
            this.state.deleteOk && (
              <div style={{ color: "red" }}>
                User deleted!
              </div>
            )
          }
          {
            this.state.users.map((user, index) => (
              <div class="container1">
                <img src={user.image} />
                <p><span>{user.name}</span> {user.nMec}</p>
                <button onClick={(e) => this.editUser(user._id)}>Edit</button>
                <button onClick={(e) => this.deleteUser(user._id, index)} >Delete</button>
              </div>
            ))
          }

        </div>

        <div className="dash">
          <form onSubmit={(e) => this.handlerNewSubmit(e)} id="formSubmitUser">
            <h3 id="title">Add User</h3>
            <label for="nMec"> Mecanographic number</label>
            <input type="text" id="nMec" name="nMec" placeholder="Nº mec.."  value={this.state.newUser.nMec} onChange={(e) => this.handlerNew(e)} />

            <label for="name"> Name</label>
            <input type="text" id="name" name="name" placeholder="User name.." value={this.state.newUser.name} onChange={(e) => this.handlerNew(e)} />

            <label for="password"> Password</label>
            <input type="text" id="password" name="password" placeholder="User password.."  onChange={(e) => this.handlerNew(e)} />

            <label for="image"> Image</label>
            <input type="text" id="image" name="image" placeholder="User image URL.." value={this.state.newUser.image} onChange={(e) => this.handlerNew(e)} />

            <label for="number">Admin</label>
            <select id="isAdmin" name="isAdmin" value={this.state.newUser.isAdmin} onChange={(e) => this.handlerNew(e)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>

            <input type="submit" value="Confirm" />
           
            {this.state.error && (
              <div style={{ color: "red" }} >
                Error creating user!
              </div>
            )}

            {this.state.newUserSuccess && (
              <div style={{ color: "green" }} >
                The user has been saved successfully!
              </div>
            )}
             <input type="reset"  value="Clear"/>
          </form>

        </div>

      </div>



    );
  };

  componentDidMount() {
    getAllUsers().then(result => {
      this.setState({
        users: result
      })
    })
  }

};

export default Dashboard;