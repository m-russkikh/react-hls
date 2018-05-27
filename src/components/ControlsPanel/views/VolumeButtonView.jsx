import React from 'react';
import classnames from 'classnames';

import AbstractButtonView from './AbstractButtonView';
import { VolumeButtonViewPropType } from '../propTypes';
import '../styles/controls-panel.scss';


function VolumeButtonView({ isMuted, onClick }) {
  const className = classnames('volume', { off: isMuted });

  return (
    <AbstractButtonView className={className} onClick={onClick} />
  );
}

VolumeButtonView.propTypes = VolumeButtonViewPropType;

export default VolumeButtonView;
