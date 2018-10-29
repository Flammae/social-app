import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getPosts } from "../redux/actions/posts";
import "./Main.css";
import FollowerPosts from "./main/FollowerPosts";
import Previews from "./main/Previews";

class Main extends PureComponent {
  state = {
    currentPost: {}
  };

  componentDidMount = () => {
    this.props.getPosts("/api/posts/from-following");
  };

  updateCurrentPost = post => {
    this.setState({ currentPost: post });
  };

  render() {
    return (
      <div className="main">
        <Header />;
        <div className="center">
          <Previews
            currentPost={this.state.currentPost}
            posts={this.props.posts}
          />
          <FollowerPosts
            posts={this.props.posts}
            updateCurrentPost={this.updateCurrentPost}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = {
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
