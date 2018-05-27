import React from 'react';
import { shallow, mount } from 'enzyme';

export function getShallowWrapper(Component, props, ...args) {
  return shallow(
    <Component {...props} />,
    ...args
  );
}

export function getMountWrapper(Component, props, ...args) {
  return mount(
    <Component {...props} />,
    ...args
  );
}
