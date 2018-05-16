import { connect } from 'react-redux';

import { PlayerContainer } from '../containers';


const mapStateToProps = ({ isFullscreen }) => ({
  isFullscreen,
});

export default connect(mapStateToProps)(PlayerContainer);
