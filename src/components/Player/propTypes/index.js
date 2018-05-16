import PropTypes from 'prop-types';

export const PlayerContainerPropType = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
};
