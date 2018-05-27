import React, { PureComponent } from 'react';
import screenfull from 'screenfull';

import ControlsPanel from '../../ControlsPanel';
import PlainText from '../../PlainText';
import HlsVideo from '../../HlsVideo';
import { PlayerContainerPropType } from '../propTypes';
import { DISABLE_CONTROLS_TIMEOUT_MSEC } from '../../../constants/player';
import '../styles/player.scss';

class PlayerContainer extends PureComponent {
  state = {
    isDisabledControls: false,
  };

  componentDidMount() {
    this.setDisableControlsTimeout(true);
  }

  componentDidUpdate(prevProps) {
    const { isFullscreen } = this.props;
    const { isFullscreen: isFullscreenPrev } = prevProps;

    if (isFullscreen !== isFullscreenPrev) {
      this.toggleFulscreenMode();
    }
  }

  componentWillUnmount() {
    this.clearDisableControlsTimeout();
  }

  setDisableControlsTimeout = (isDisabledControls) => {
    this.clearDisableControlsTimeout();
    this.timeoutId = setTimeout(() => this.disableControls(isDisabledControls), DISABLE_CONTROLS_TIMEOUT_MSEC);
  }

  clearDisableControlsTimeout = () => {
    clearTimeout(this.timeoutId);
  };

  disableControls = (isDisabledControls) => {
    this.setState({ isDisabledControls });
  }

  toggleFulscreenMode = () => {
    if (screenfull.enabled) {
      screenfull.toggle(this.player);
    }
  };

  showControlsPanel = () => {
    if (this.state.isDisabledControls) {
      this.disableControls(false);
    }

    this.setDisableControlsTimeout(true);
  }

  render() {
    const { source, title } = this.props;

    return (
      <div
        className="player"
        onMouseMove={this.showControlsPanel}
        onClick={this.showControlsPanel}
        ref={(player) => { this.player = player; }}
      >
        <HlsVideo source={source} />
        {
          !this.state.isDisabledControls &&
          <React.Fragment>
            <PlainText className="title">{title}</PlainText>
            <ControlsPanel />
          </React.Fragment>
        }
      </div>
    );
  }
}

PlayerContainer.propTypes = PlayerContainerPropType;

export default PlayerContainer;
