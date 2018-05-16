import React, { Component } from 'react';

import { FullScreenButtonView } from '../views';
import { FullScreenButtonContainerPropType } from '../propTypes';


class FullScreenButtonContainer extends Component {
  handleClick = () => {
    const { changeFullscreenStatus, isFullscreen } = this.props;

    changeFullscreenStatus(!isFullscreen);
  };

  render() {
    return (
      <FullScreenButtonView isFullscreen={this.props.isFullscreen} onClick={this.handleClick} />
    );
  }
}

FullScreenButtonContainer.propTypes = FullScreenButtonContainerPropType;

export default FullScreenButtonContainer;
