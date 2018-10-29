import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/auth";
import "./Register.css";

class Register extends Component {
  // sends post request to /auth/register
  handleSubmit = e => {
    e.preventDefault();
    const keys = Object.keys(this.refs);
    const fields = keys.reduce((obj, key) => {
      obj[key] = this.refs[key].value;
      return obj;
    }, {});
    this.props.registerUser(fields);
  };

  render() {
    const { errors } = this.props;
    // convert array of errors into usable object with keys set to
    // fields where the errors occured and the values set to error messages
    const myErrors = errors.reduce((obj, err) => {
      obj[err.param] = err.msg;
      return obj;
    }, {});

    return (
      <div className={`register`}>
        <form>
          <h2>Register</h2>
          <span>{myErrors.general}</span>
          <label className="small">Firstname:</label>
          <label className="small">Lastname:</label>
          <input
            type="text"
            className="small"
            placeholder="firstname"
            ref="firstName"
          />
          <input
            type="text"
            className="small"
            placeholder="lastname"
            ref="lastName"
          />
          <span className="small">{myErrors.firstName}</span>
          <span className="small">{myErrors.lastName}</span>
          <label>Age:</label>
          <input type="text" placeholder="age" ref="age" />
          <span>{myErrors.age}</span>
          <label>Email:</label>
          <input type="email" placeholder="email" ref="email" />
          <span>{myErrors.email}</span>
          <label>Password:</label>
          <input type="password" placeholder="password" ref="password" />
          <span>{myErrors.password}</span>
          <label>confirm password:</label>
          <input
            type="password"
            placeholder="confirm password"
            ref="passwordConfirm"
          />
          <span>{myErrors.passwordConfirm}</span>
          <button onClick={this.handleSubmit}>Register</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
