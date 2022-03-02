import React from "react";
import loginImg from "./login.png";
import sha1 from 'sha1';

import { userLogin } from '../../api'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        nMec: "",
        password: ""
      },
      fullName: null,
      email: null,
      password: null,
      errors: ""
    };
  }


  handleChange = (e) => {
    var login = this.state.login;

    if (e.target.name === "password") {
      login[e.target.name] = sha1(e.target.value);
    } else {
      login[e.target.name] = e.target.value;
    }



  }


  handleSubmit = (event) => {
    event.preventDefault();

    userLogin(this.state.login).then(result => {
      if (result.login) {
        this.setState({
          errors: ""
        })
        // save token in the localStorage
        localStorage.setItem("token", result.token);
        this.props.history.push("/");
        this.props.login(result.token);

      } else {

        this.setState({
          errors: result.message
        });
      }
    })

  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="headerLogin">Login</div>
        <div className="content">
          <div className="imageLogin">
            <img src={loginImg} />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Numero</label>
              <input type="text" name="nMec" id="email" placeholder="Nª Mec" onChange={(e) => this.handleChange(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            </div>
            <div className="footer">
              <button type="submit" className="btnLogin">
                Login
              </button>
            </div>
            {
              this.state.errors && (
                <div>
                  {this.state.errors}
                </div>
              )
            }
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {

    if (this.props.isLogged) {
      this.props.history.push("/")
    } else {
      this.props.history.push("/login")
    }
  }
}


