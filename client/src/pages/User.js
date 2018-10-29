import React, { PureComponent } from "react";
import { Route, Switch } from "react-router";
import Header from "../components/Header";
import "./User.css";
import ArrowNav from "./user/ArrowNav";
import UserPosts from "./user/UserPosts";
import Sticky from "./user/Sticky";
import Followers from "./user/Followers";
import UserCard from "../components/UserCard";
import UserCover from "./user/UserCover";
import { connect } from "react-redux";
import { getCurrentUser } from "../redux/actions/currentUser";
import Following from "./user/Following";
import Edit from "./user/Edit";
import { follow, unfollow } from "../redux/actions/followers";

class User extends PureComponent {
  componentDidMount = () => {
    this.props.getCurrentUser(this.props.match.params.id);
  };

  componentWillReceiveProps = nextProps => {
    const { match, getCurrentUser } = this.props;
    if (nextProps.match.params.id !== match.params.id) {
      getCurrentUser(nextProps.match.params.id);
    }
  };

  render() {
    const { match, user, loggedInUser, follow, unfollow } = this.props;

    return (
      <div className="user">
        <Header />
        <UserCover />
        <div className="center">
          <Sticky
            fixedPos={64 + 16}
            restedPos={400 + 64 - 280}
            changePos={400 - 280}
          >
            <UserCard
              user={user}
              loggedInUser={loggedInUser}
              matchUrl={match.url}
              follow={follow}
              unfollow={unfollow}
            />
            <ArrowNav match={match} user={user} loggedInUser={loggedInUser} />
          </Sticky>

          <Switch>
            <Route path={match.path} exact component={UserPosts} />
            <Route path={match.path + "/following"} component={Following} />
            <Route path={match.path + "/followers"} component={Followers} />
            <Route path={match.path + "/edit"} component={Edit} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
  loggedInUser: state.user._id
});

const mapDispatchToProps = {
  getCurrentUser,
  follow,
  unfollow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
