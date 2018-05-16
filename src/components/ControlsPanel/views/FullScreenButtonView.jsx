import React from 'react';
import classnames from 'classnames';

import { AbstractButtonView } from '../views';
import { FullScreenButtonViewPropType } from '../propTypes';
import '../styles/controls-panel.scss';


function FullScreenButtonView({ isFullscreen, onClick }) {
  const className = classnames('fullscreen', { off: isFullscreen });

  return (
    <AbstractButtonView className={className} onClick={onClick} />
  );
}

FullScreenButtonView.propTypes = FullScreenButtonViewPropType;

export default FullScreenButtonView;
