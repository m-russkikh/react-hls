import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { VolumeButtonView } from '../views';
import { VolumeContainerPropType } from '../propTypes';


class VolumeContainer extends Component {
  handleVolumeButtonClick = () => {
    const { isMuted, volume, changeMuteStatus } = this.props;

    if (volume === 0 && isMuted) return;

    changeMuteStatus(!isMuted);
  };

  handleVolumeChange = (volume) => {
    const { changeVolume, changeMuteStatus, isMuted } = this.props;
    const currentMuteStatus = !volume;

    changeVolume(volume);

    if (currentMuteStatus !== isMuted) {
      changeMuteStatus(currentMuteStatus);
    }
  };

  render() {
    const { isMuted, volume } = this.props;

    return (
      <div>
        <VolumeButtonView isMuted={isMuted} onClick={this.handleVolumeButtonClick} />
        <Slider
          className="slider-volume"
          value={isMuted ? 0 : volume}
          railStyle={{ opacity: 0.4 }}
          trackStyle={{ backgroundColor: 'white' }}
          handleStyle={{ display: 'none' }}
          onChange={this.handleVolumeChange}
        />
      </div>
    );
  }
}

VolumeContainer.propTypes = VolumeContainerPropType;

export default VolumeContainer;
