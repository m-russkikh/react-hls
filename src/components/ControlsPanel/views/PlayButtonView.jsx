import React from 'react';

import AbstractButtonView from './AbstractButtonView';
import { PlayButtonViewPropType } from '../propTypes';
import '../styles/controls-panel.scss';


function PlayButtonView({ isPlaying, onClick }) {
  const className = isPlaying ? 'pause' : 'play';

  return (
    <AbstractButtonView className={className} onClick={onClick} />
  );
}

PlayButtonView.propTypes = PlayButtonViewPropType;

export default PlayButtonView;
