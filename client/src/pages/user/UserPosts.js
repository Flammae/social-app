import React, { PureComponent } from "react";
import Post from "../../components/Post";
import { connect } from "react-redux";
import { getPosts, likePost, unlikePost } from "../../redux/actions/posts";
import PostInput from "../../components/PostInput";
import Aux from "react-aux";
import "./UserPosts.css";

class UserPosts extends PureComponent {
  componentWillReceiveProps = nextProps => {
    const { getPosts, currentUserId } = nextProps;
    if (currentUserId !== this.props.currentUserId) {
      getPosts("/api/posts/" + currentUserId);
    }
  };

  componentDidMount = () => {
    const { getPosts, currentUserId } = this.props;
    currentUserId && getPosts("/api/posts/" + currentUserId);
  };

  render() {
    const { posts, currentUserId, userId, likePost, unlikePost } = this.props;
    const renderPosts = posts.map(post => {
      return (
        <Post
          key={post._id}
          post={post}
          likePost={likePost}
          unlikePost={unlikePost}
        />
      );
    });

    return (
      <div className="user-posts">
        {currentUserId === userId && <PostInput />}
        {renderPosts}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  currentUserId: state.currentUser._id,
  userId: state.user._id
});

const mapDispatchToProps = {
  getPosts,
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPosts);
