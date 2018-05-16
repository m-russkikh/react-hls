import React from 'react';

import PlainText from '../../PlainText';
import { TimerViewPropType } from '../propTypes';


function TimerView({ currentTime }) {
  return (
    <PlainText className="timer">{currentTime}</PlainText>
  );
}

TimerView.propTypes = TimerViewPropType;

export default TimerView;
