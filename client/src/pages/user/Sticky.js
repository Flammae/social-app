import React, { Component } from "react";
import { number } from "prop-types";

class Sticky extends Component {
  state = {
    fixed: false
  };

  static propTypes = {
    fixedPos: number.isRequired,
    restedPos: number.isRequired,
    changePos: number.isRequired
  };

  componentWillMount = () => {
    window.addEventListener("scroll", this._handleScroll, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this._handleScroll, false);
  };

  _handleScroll = () => {
    const { changePos } = this.props;
    const scrollTop = (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop;

    if (scrollTop >= changePos && !this.state.fixed) {
      this.setState({ fixed: true });
    } else if (scrollTop < changePos && this.state.fixed) {
      this.setState({ fixed: false });
    }
  };

  render() {
    let styles = {};

    if (this.state.fixed) {
      styles = {
        position: "fixed",
        top: this.props.fixedPos
      };
    } else {
      styles = {
        position: "absolute",
        top: this.props.restedPos
      };
    }

    return (
      <div className="sticky">
        <div style={styles}>{this.props.children}</div>
      </div>
    );
  }
}

export default Sticky;
