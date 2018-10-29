import React, { PureComponent } from "react";
import { likePost, unlikePost } from "../../redux/actions/posts";
import Post from "../../components/Post";
import PostInput from "../../components/PostInput";
import { connect } from "react-redux";
import Observer from "../../components/Observer";

class FollowerPosts extends PureComponent {
  renderChild = post => {
    return (
      <Post
        key={post._id}
        post={post}
        likePost={this.props.likePost}
        unlikePost={this.props.unlikePost}
      />
    );
  };

  render() {
    return (
      <div>
        <PostInput />
        {/* {renderPosts} */}
        <Observer
          renderChild={this.renderChild}
          data={this.props.posts}
          onAppear={this.props.updateCurrentPost}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  likePost,
  unlikePost
};

export default connect(
  null,
  mapDispatchToProps
)(FollowerPosts);
