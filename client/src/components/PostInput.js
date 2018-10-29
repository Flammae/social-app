import React, { Component } from "react";
import MdCreate from "react-icons/lib/md/create";
import MdImage from "react-icons/lib/md/image";
import FileInput from "./FileInput";
import { connect } from "react-redux";
import { addPost } from "../redux/actions/posts";
import "./PostInput.css";

class PostInput extends Component {
  state = {
    file: "",
    imagePreviewUrl: "",
    text: ""
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleSubmit = () => {
    const { text, file } = this.state;
    if (file || text) {
      this.props.addPost(file, text);
      this.setState({
        file: "",
        imagePreviewUrl: "",
        text: ""
      });
    }
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handlePostClick = () => {
    this.refs.textarea.focus();
  };

  render() {
    const { text, imagePreviewUrl } = this.state;

    let disabled;
    if ((!text && !imagePreviewUrl) || this.props.postState === "PENDING") {
      disabled = true;
    }

    return (
      <div className="post-input">
        <div className="post-input-header">
          <button className="button" onClick={this.handlePostClick}>
            <MdCreate size={18} />Post your thoghts
          </button>
          <FileInput onChange={this.handleImageChange}>
            <MdImage size={18} />Upload image
          </FileInput>
        </div>

        <textarea
          value={text}
          placeholder="Write here..."
          onChange={this.handleTextChange}
          ref="textarea"
        />

        {imagePreviewUrl && <img src={imagePreviewUrl} alt="" />}

        <button
          className="submit"
          disabled={disabled}
          onClick={this.handleSubmit}
        >
          Post
        </button>
        {this.props.postState === "ERROR" &&
          "Due to some issue your post did not upload. please try again later"}
        <div className="focus" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postState: state.posts.postState
});

const mapDispatchToProps = {
  addPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostInput);
