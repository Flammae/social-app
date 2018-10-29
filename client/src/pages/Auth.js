import React from "react";
import { Redirect } from "react-router-dom";
import GuestJoin from "./auth/GuestJoin";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { connect } from "react-redux";
import { unauthUser } from "../redux/actions/auth";
import "./Auth.css";

const Auth = class extends React.Component {
  componentWillMount = () => {
    // unauhtenticate user every time route hits /login
    this.props.unauthUser();
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.props.auth.authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth">
        <Login errors={this.props.auth.loginErrors} />
        <GuestJoin />
        <Register errors={this.props.auth.registerErrors} />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  unauthUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
