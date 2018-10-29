import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/user";
import "./Header.css";

class Header extends Component {
  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    const { user, authenticated } = this.props;

    return (
      <header>
        <div className="wrapper">
          <div className="search-input">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
          {authenticated ? (
            <nav>
              <Link to="/">New</Link>
              <Link to={"/user/" + user._id} className="user">
                <img src="https://placeimg.com/48/48/people" alt="" />
                <span>{user.firstName}</span>
              </Link>
              <Link to="/login">Log out</Link>
            </nav>
          ) : (
            <nav>
              <Link to="/login">Log in / Register</Link>
            </nav>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
