import React from 'react';
import screenfull from 'screenfull';

import { getMountWrapper } from '../../../utils/testUtils';
import ControlsPanel from '../../ControlsPanel';
import PlainText from '../../PlainText';
import HlsVideo from '../../HlsVideo';
import { PlayerContainer } from '../containers';
import { DISABLE_CONTROLS_TIMEOUT_MSEC } from '../../../constants/player';


jest.mock('../../ControlsPanel', () => () => null);
jest.mock('../../PlainText', () => () => null);
jest.mock('../../HlsVideo', () => () => null);

describe('PlayerContainer', () => {
  const props = {
    isFullscreen: false,
    title: 'title',
    source: 'source',
  };

  describe('root element', () => {
    let commonWrapper;
    let wrapper;
    let instance;

    beforeAll(() => {
      commonWrapper = getMountWrapper(PlayerContainer, props);
      instance = commonWrapper.instance();
      wrapper = commonWrapper.children();
    });

    it('should be presented with div', () => {
      expect(wrapper.is('div')).toBeTruthy();
      expect(wrapper).toHaveLength(1);
    });

    it('should contain HlsVideo component', () => {
      expect(wrapper.contains(<HlsVideo source={props.source} />)).toBeTruthy();
    });

    it('should not contain controls', () => {
      commonWrapper.setState({ isDisabledControls: true });

      expect(commonWrapper.contains(<PlainText className="title">{props.title}</PlainText>)).toBeFalsy();
      expect(commonWrapper.contains(<ControlsPanel />)).toBeFalsy();
    });

    it('should contain controls', () => {
      commonWrapper.setState({ isDisabledControls: false });

      expect(commonWrapper.contains(<PlainText className="title">{props.title}</PlainText>)).toBeTruthy();
      expect(commonWrapper.contains(<ControlsPanel />)).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should have correct class name', () => {
          expect(wrapper.prop('className')).toBe('player');
        });
      });

      describe('onMouseMove', () => {
        it('should handle mousemove event', () => {
          expect(wrapper.prop('onMouseMove')).toEqual(instance.showControlsPanel);
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          expect(wrapper.prop('onClick')).toEqual(instance.showControlsPanel);
        });
      });

      describe('ref', () => {
        it('should save a link to the player element', () => {
          expect(instance.player).toEqual(wrapper.getDOMNode());
        });
      });
    });
  });

  describe('methods', () => {
    describe('componentDidMount', () => {
      let wrapper;

      beforeAll(() => {
        jest.useFakeTimers();

        wrapper = getMountWrapper(PlayerContainer, props);
      });

      it('should hide controls after a certain amount of time', () => {
        expect(wrapper.state('isDisabledControls')).toBeFalsy();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), DISABLE_CONTROLS_TIMEOUT_MSEC);

        jest.runOnlyPendingTimers();

        expect(wrapper.state('isDisabledControls')).toBeTruthy();
      });
    });

    describe('componentDidUpdate', () => {
      let wrapper;
      let instance;

      beforeEach(() => {
        wrapper = getMountWrapper(PlayerContainer, props);
        instance = wrapper.instance();
      });

      describe('fullscreen mode status', () => {
        describe('fulscreen not supported', () => {
          beforeAll(() => {
            screenfull.enabled = false;
          });

          it('should not do anything', () => {
            wrapper.setProps({ ...props, isFullscreen: false });
            wrapper.setProps({ ...props, isFullscreen: true });

            expect(screenfull.toggle).toHaveBeenCalledTimes(0);

            wrapper.setProps({ ...props, isFullscreen: false });

            expect(screenfull.toggle).toHaveBeenCalledTimes(0);
          });
        });

        describe('fulscreen is supported', () => {
          beforeAll(() => {
            screenfull.enabled = true;
          });

          afterEach(() => {
            screenfull.toggle.mockClear();
          });

          it('should change full screen mode', () => {
            wrapper.setProps({ ...props, isFullscreen: false });
            screenfull.toggle.mockClear();
            wrapper.setProps({ ...props, isFullscreen: true });

            expect(screenfull.toggle).toHaveBeenCalledTimes(1);
            expect(screenfull.toggle).toHaveBeenCalledWith(instance.player);

            wrapper.setProps({ ...props, isFullscreen: false });

            expect(screenfull.toggle).toHaveBeenCalledTimes(2);
            expect(screenfull.toggle).toHaveBeenLastCalledWith(instance.player);
          });

          it('should not change fullscreen mode', () => {
            wrapper.setProps({ ...props, isFullscreen: false });
            screenfull.toggle.mockClear();
            wrapper.setProps({ ...props, isFullscreen: false });

            expect(screenfull.toggle).toHaveBeenCalledTimes(0);

            wrapper.setProps({ ...props, isFullscreen: true });
            screenfull.toggle.mockClear();
            wrapper.setProps({ ...props, isFullscreen: true });

            expect(screenfull.toggle).toHaveBeenCalledTimes(0);
          });
        });
      });
    });

    describe('componentWillUnmount', () => {
      let wrapper;
      let instance;

      beforeAll(() => {
        wrapper = getMountWrapper(PlayerContainer, props);
        instance = wrapper.instance();

        jest.useFakeTimers();
        wrapper.unmount();
      });

      it('should clear timeout', () => {
        expect(clearTimeout).toHaveBeenCalledTimes(1);
        expect(clearTimeout).toHaveBeenCalledWith(instance.timeoutId);
      });
    });

    describe('showControlsPanel', () => {
      let wrapper;
      let instance;

      beforeAll(() => {
        wrapper = getMountWrapper(PlayerContainer, props);
        instance = wrapper.instance();
      });

      describe('isDisabledControls', () => {
        it('should show controls', () => {
          wrapper.setState({ isDisabledControls: true });

          instance.showControlsPanel();

          expect(wrapper.state('isDisabledControls')).toBeFalsy();
        });

        it('should not do anything', () => {
          wrapper.setState({ isDisabledControls: false });

          instance.showControlsPanel();

          expect(wrapper.state('isDisabledControls')).toBeFalsy();
        });
      });

      it('should hide controls after a certain amount of time', () => {
        jest.useFakeTimers();
        instance.showControlsPanel();

        expect(wrapper.state('isDisabledControls')).toBeFalsy();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), DISABLE_CONTROLS_TIMEOUT_MSEC);

        jest.runOnlyPendingTimers();

        expect(wrapper.state('isDisabledControls')).toBeTruthy();
      });
    });
  });
});
