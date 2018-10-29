import React, { PureComponent } from "react";
import { getFollowing, follow, unfollow } from "../../redux/actions/followers";
import UserCard from "../../components/UserCard";
import "./Followers.css";
import { connect } from "react-redux";

class Following extends PureComponent {
  componentWillReceiveProps = nextProps => {
    const { getFollowing, currentUserId } = this.props;
    if (currentUserId !== nextProps.currentUserId) {
      getFollowing(nextProps.currentUserId);
    }
  };

  componentDidMount = () => {
    const { getFollowing, currentUserId } = this.props;
    currentUserId && getFollowing(currentUserId);
  };

  render() {
    const { userId, follow, unfollow, match } = this.props;
    const userCards = this.props.following.map(item => (
      <UserCard
        user={item}
        key={item._id}
        loggedInUser={userId}
        follow={follow}
        unfollow={unfollow}
        matchUrl={match.url}
      />
    ));

    return <div className="following">{userCards}</div>;
  }
}

const mapStateToProps = state => ({
  following: state.following,
  userId: state.user._id,
  currentUserId: state.currentUser._id
});

const mapDispatchToProps = {
  getFollowing,
  follow,
  unfollow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Following);
