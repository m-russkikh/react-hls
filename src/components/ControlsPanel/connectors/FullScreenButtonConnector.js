import { connect } from 'react-redux';

import { changeFullscreenStatus } from '../../../actions/player';
import { FullScreenButtonContainer } from '../containers';


const mapStateToProps = ({ isFullscreen }) => ({
  isFullscreen,
});

const mapDispatchToProps = {
  changeFullscreenStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenButtonContainer);
