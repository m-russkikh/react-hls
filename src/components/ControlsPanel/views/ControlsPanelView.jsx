import React from 'react';

import {
  PlayButtonConnector,
  VolumeConnector,
  FullScreenButtonConnector,
  TimerConnector,
} from '../connectors';


function ControlsPanelView() {
  return (
    <div className="controls-panel">
      <div className="left">
        <PlayButtonConnector />
        <VolumeConnector />
      </div>
      <div>
        <TimerConnector />
        <FullScreenButtonConnector />
      </div>
    </div>
  );
}

export default ControlsPanelView;
