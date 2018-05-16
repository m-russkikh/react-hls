import React from 'react';

import { PlainTextViewPropType } from '../propTypes';

function PlainTextView({ children, className }) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}

PlainTextView.propTypes = PlainTextViewPropType;

export default PlainTextView;
