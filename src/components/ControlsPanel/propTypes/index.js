import PropTypes from 'prop-types';

export const AbstractButtonViewPropType = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export const PlayButtonViewPropType = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const FullScreenButtonViewPropType = {
  isFullscreen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const VolumeButtonViewPropType = {
  isMuted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const PlayButtonContainerPropType = {
  isPlaying: PropTypes.bool.isRequired,
  changePlaybackStatus: PropTypes.func.isRequired,
};

export const VolumeContainerPropType = {
  isMuted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  changeMuteStatus: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
};

export const FullScreenButtonContainerPropType = {
  isFullscreen: PropTypes.bool.isRequired,
  changeFullscreenStatus: PropTypes.func.isRequired,
};

export const TimerViewPropType = {
  currentTime: PropTypes.string.isRequired,
};
