import React, { Component } from "react";
import ModelViewer from "metamask-logo";

class MetamaskLogo extends Component {
  componentDidMount() {
    this.viewer = ModelViewer({
      pxNotRatio: true,
      width: 150,
      height: 150,
      followMouse: true,
    });
    this.el.appendChild(this.viewer.container);
  }

  componentWillUnmount() {
    this.viewer.stopAnimation();
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center"
        ref={(el) => (this.el = el)}
      />
    );
  }
}

export default MetamaskLogo;
