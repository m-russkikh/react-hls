import PropTypes from 'prop-types';

export const HlsVideoContainerPropType = {
  source: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  changeCurrentTime: PropTypes.func.isRequired,
  changePlaybackStatus: PropTypes.func.isRequired,
};
