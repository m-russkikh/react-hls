import React from 'react';
import classnames from 'classnames';

import { AbstractButtonViewPropType } from '../propTypes';


function AbstractButtonView({ className, onClick }) {
  return (
    <div
      className={classnames('button', className)}
      onClick={onClick}
    />
  );
}

AbstractButtonView.propTypes = AbstractButtonViewPropType;

AbstractButtonView.defaultProps = {
  className: '',
};

export default AbstractButtonView;
