import React, { PureComponent } from "react";
import { arrayOf, func, string, shape, number } from "prop-types";

class Observer extends PureComponent {
  static propTypes = {
    data: arrayOf(
      shape({
        _id: string.isRequired
      })
    ),
    renderChild: func.isRequired,
    onAppear: func.isRequired,
    onEndReached: func,
    endThreshold: number
  };

  state = {
    observer: null
  };

  componentWillMount = () => {
    const callback = entries => {
      let visibleIds = [];
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleIds.push(entry.target.getAttribute("id"));
        }
      });

      if (visibleIds.length > 0) {
        const visibleElem = this.props.data.find(
          item => item._id === visibleIds[visibleIds.length - 1]
        );

        this.props.onAppear(visibleElem);
      }
    };

    const options = {
      margin: "64px"
    };

    const observer = new IntersectionObserver(callback, options);

    this.setState({ observer });
  };

  componentDidMount = () => {
    this.observeNewElements(this.props.data);
    console.log(this.props.data);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { data } = this.props;
    if (data !== prevProps.data) {
      const prevIds = prevProps.data.map(item => item._id);
      const newElements = data.filter(item => !prevIds.includes(item._id));
      this.observeNewElements(newElements);
    }
  };

  // find new dom elements and obzerve
  observeNewElements = newElements => {
    const childNodes = [].slice.call(this.refs.container.childNodes);
    const newIds = newElements.map(el => el._id);
    const newDomElements = childNodes.filter(item =>
      newIds.includes(item.getAttribute("id"))
    );
    console.log("new", newDomElements);
    newDomElements.forEach(el => this.state.observer.observe(el));
  };

  render() {
    const { renderChild, data } = this.props;

    const children = data.map(renderChild);

    return (
      <div className="observer" ref="container">
        {children}
      </div>
    );
  }
}

export default Observer;
