import React, { PureComponent } from "react";
import "./Edit.css";
import FileInput from "../../components/FileInput";
import PlaceholderImage from "../../components/PlaceholderImage";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Edit extends PureComponent {
  state = {
    profileFile: "",
    profilePreviewUrl: "",
    coverFile: "",
    coverPreviewUrl: ""
  };

  handleImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    const name = e.target.name;
    console.log(name);

    reader.onloadend = () => {
      this.setState({
        [name + "File"]: file,
        [name + "PreviewUrl"]: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleSubmit = () => {
    const { profileFile, coverFile } = this.state;
    if (profileFile || coverFile) {
      this.props.editUser(profileFile, coverFile);
    }
  };

  render() {
    const { profilePreviewUrl, coverPreviewUrl } = this.state;
    const { user, match } = this.props;
    console.log("match", match);

    if (user._id && user._id !== match.params.id) {
      return <Redirect to={"/users/" + match.params.id} />;
    }

    console.log(profilePreviewUrl);

    return (
      <div className="edit">
        <h2>Edit your profile information</h2>
        <div className="edit-grid">
          <div className="small">
            <PlaceholderImage
              currentSrc={user.profileImg}
              uploadSrc={profilePreviewUrl}
              placeholderSrc={"/profile.jpeg"}
            />
            <FileInput onChange={this.handleImageChange} name="profile">
              Update Profile
            </FileInput>
          </div>
          <div className="long">
            <PlaceholderImage
              currentSrc={user.coverImg}
              uploadSrc={coverPreviewUrl}
              placeholderSrc="/cover.jpg"
            />
            <FileInput onChange={this.handleImageChange} name="cover">
              Update Cover
            </FileInput>
          </div>

          <div className="full-width">
            <p>
              you should be able to edit other informations but the developers
              are too lazy to implement that feature
            </p>
          </div>

          <button
            className="save-button full-width"
            onClick={this.handleSubmit}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
