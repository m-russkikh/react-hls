import { connect } from 'react-redux';

import { TimerView } from '../views';


const mapStateToProps = ({ currentTime }) => ({
  currentTime,
});

export default connect(mapStateToProps)(TimerView);
