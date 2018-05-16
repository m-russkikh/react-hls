import React, { Component } from 'react';

import { PlayButtonView } from '../views';
import { PlayButtonContainerPropType } from '../propTypes';


class PlayButtonContainer extends Component {
  handleClick = () => {
    const { changePlaybackStatus, isPlaying } = this.props;

    changePlaybackStatus(!isPlaying);
  };

  render() {
    return (
      <PlayButtonView isPlaying={this.props.isPlaying} onClick={this.handleClick} />
    );
  }
}

PlayButtonContainer.propTypes = PlayButtonContainerPropType;

export default PlayButtonContainer;
