import React, { PureComponent } from "react";
import { getFollowers, follow, unfollow } from "../../redux/actions/followers";
import UserCard from "../../components/UserCard";
import { connect } from "react-redux";
import "./Followers.css";
import Aux from "react-aux";

class Followers extends PureComponent {
  componentWillReceiveProps = nextProps => {
    const { getFollowers, currentUserId } = this.props;
    if (currentUserId !== nextProps.currentUserId) {
      getFollowers(nextProps.currentUserId);
    }
  };

  componentDidMount = () => {
    const { getFollowers, currentUserId } = this.props;
    currentUserId && getFollowers(currentUserId);
  };

  render() {
    const { follow, unfollow, userId, match } = this.props;
    const userCards = this.props.followers.map(item => (
      <UserCard
        key={item._id}
        user={item}
        follow={follow}
        unfollow={unfollow}
        loggedInUser={userId}
        matchUrl={match.url}
      />
    ));

    return <div className="followers">{userCards}</div>;
  }
}

const mapStateToProps = state => ({
  followers: state.followers,
  userId: state.user._id,
  currentUserId: state.currentUser._id
});

const mapDispatchToProps = {
  getFollowers,
  follow,
  unfollow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
