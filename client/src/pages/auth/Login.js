import React, { Component } from "react";
import { loginUser } from "../../redux/actions/auth";
import { connect } from "react-redux";
import "./Login.css";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  };

  render() {
    const { errors } = this.props;
    console.log("props", this.props);
    const myErrors = errors.reduce((obj, err) => {
      obj[err.param] = err.msg;
      return obj;
    }, {});

    return (
      <div className="login">
        <h2>Log in</h2>
        <form>
          <input type="text" placeholder="email" ref="email" />
          <span>{myErrors.email}</span>
          <input type="password" placeholder="password" ref="password" />
          <span>{myErrors.password}</span>
          <span>{myErrors.general}</span>
          <a href="#" className="small">
            Forgot password?
          </a>
          <button className="small" onClick={this.handleSubmit}>
            Log in
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
