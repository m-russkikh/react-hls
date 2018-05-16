import { connect } from 'react-redux';

import { changePlaybackStatus } from '../../../actions/player';
import { PlayButtonContainer } from '../containers';


const mapStateToProps = ({ isPlaying }) => ({
  isPlaying,
});

const mapDispatchToProps = {
  changePlaybackStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButtonContainer);
