import { connect } from 'react-redux';

import { changeMuteStatus, changeVolume } from '../../../actions/player';
import { VolumeContainer } from '../containers';


const mapStateToProps = ({ isMuted, volume }) => ({
  isMuted,
  volume,
});

const mapDispatchToProps = {
  changeMuteStatus,
  changeVolume,
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeContainer);
