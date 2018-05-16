import { connect } from 'react-redux';

import { changeCurrentTime, changePlaybackStatus, canPlay } from '../../../actions/player';
import { HlsVideoContainer } from '../containers';


const mapStateToProps = ({ volume, isMuted, isPlaying }) => ({
  volume,
  isMuted,
  isPlaying,
});

const mapDispatchToProps = {
  changeCurrentTime,
  changePlaybackStatus,
  canPlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(HlsVideoContainer);
