import Slider from 'rc-slider';

import { getShallowWrapper } from '../../../utils/testUtils';
import { VolumeContainer } from '../containers';
import { VolumeButtonView } from '../views';


jest.mock('rc-slider');

jest.mock('../views', () => ({
  VolumeButtonView: () => null
}));

describe('VolumeContainer', () => {
  const props = {
    isMuted: false,
    volume: 70,
    changeMuteStatus: jest.fn(),
    changeVolume: jest.fn(),
  };
  const commonWrapper = getShallowWrapper(VolumeContainer, props);
  const commonInstance = commonWrapper.instance();

  describe('root element', () => {
    it('should be presented with div', () => {
      const wrapper = getShallowWrapper(VolumeContainer, props);

      expect(wrapper.is('div')).toBeTruthy();
    });
  });

  describe('VolumeButtonView', () => {
    let volumeButtonViewView;
    let instance;

    beforeAll(() => {
      const wrapper = getShallowWrapper(VolumeContainer, props);

      volumeButtonViewView = wrapper.find(VolumeButtonView);
      instance = wrapper.instance();
    });

    it('should contain VolumeButtonView', () => {
      expect(volumeButtonViewView).toHaveLength(1);
    });

    describe('props', () => {
      describe('isMuted', () => {
        it('should taken from parent component props', () => {
          expect(volumeButtonViewView.prop('isMuted')).toBe(props.isMuted);
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          expect(volumeButtonViewView.prop('onClick')).toEqual(instance.handleVolumeButtonClick);
        });
      });
    });
  });

  describe('Slider', () => {
    const className = 'slider-volume';
    let wrapper;
    let sliderWrapper;
    let instance;

    beforeAll(() => {
      wrapper = getShallowWrapper(VolumeContainer, props);
      sliderWrapper = wrapper.find(Slider);
      instance = wrapper.instance();
    });

    it('should contain Slider', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('props', () => {
      describe('className', () => {
        it('should have correct class name', () => {
          expect(sliderWrapper.hasClass(className)).toBeTruthy();
        });
      });

      describe('value', () => {
        it('should taken from parent component "volume" property', () => {
          expect(sliderWrapper.prop('value')).toBe(props.volume);
        });

        it('should be 0', () => {
          wrapper.setProps({ ...props, isMuted: true });

          expect(wrapper.find(Slider).prop('value')).toBe(0);
        });
      });

      describe('railStyle', () => {
        it('should have correct rail style', () => {
          const expected = { opacity: 0.4 };

          expect(sliderWrapper.prop('railStyle')).toEqual(expected);
        });
      });

      describe('trackStyle', () => {
        it('should have correct track style', () => {
          const expected = { backgroundColor: 'white' };

          expect(sliderWrapper.prop('trackStyle')).toEqual(expected);
        });
      });

      describe('handleStyle', () => {
        it('should have correct handle style', () => {
          const expected = { display: 'none' };

          expect(sliderWrapper.prop('handleStyle')).toEqual(expected);
        });
      });

      describe('onChange', () => {
        it('should handle change event', () => {
          expect(sliderWrapper.prop('onChange')).toEqual(instance.handleVolumeChange);
        });
      });
    });
  });

  describe('methods', () => {
    let props;
    let wrapper;
    let instance;

    beforeEach(() => {
      props = {
        isMuted: false,
        volume: 70,
        changeMuteStatus: jest.fn(),
        changeVolume: jest.fn(),
      };
      wrapper = getShallowWrapper(VolumeContainer, props);
      instance = wrapper.instance();
    });

    describe('handleVolumeButtonClick()', () => {
      describe('volume > 0, isMuted = false', () => {
        it('should call changeMuteStatus', () => {
          instance.handleVolumeButtonClick();

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(1);
          expect(props.changeMuteStatus).toHaveBeenCalledWith(true);
        });
      });

      describe('volume > 0, isMuted = true', () => {
        it('should call changeMuteStatus', () => {
          wrapper.setProps({ ...props, isMuted: true });
          instance.handleVolumeButtonClick();

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(1);
          expect(props.changeMuteStatus).toHaveBeenCalledWith(false);
        });
      });

      describe('volume = 0, isMuted = false', () => {
        it('should call changeMuteStatus', () => {
          wrapper.setProps({ ...props, volume: 0 });
          instance.handleVolumeButtonClick();

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(1);
          expect(props.changeMuteStatus).toHaveBeenCalledWith(true);
        });
      });

      describe('volume = 0, isMuted = true', () => {
        it('should not call changeMuteStatus', () => {
          wrapper.setProps({ ...props, volume: 0, isMuted: true });
          instance.handleVolumeButtonClick();

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('handleVolumeChange(volume)', () => {
      describe('volume > 0, isMuted = false', () => {
        it('should call changeMuteStatus', () => {
          const volume = 70;

          instance.handleVolumeChange(volume);

          expect(props.changeVolume).toHaveBeenCalledTimes(1);
          expect(props.changeVolume).toHaveBeenCalledWith(volume);

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(0);
        });
      });

      describe('volume > 0, isMuted = true', () => {
        it('should call changeMuteStatus and changeMuteStatus', () => {
          const volume = 70;

          wrapper.setProps({ ...props, isMuted: true });
          instance.handleVolumeChange(volume);

          expect(props.changeVolume).toHaveBeenCalledTimes(1);
          expect(props.changeVolume).toHaveBeenCalledWith(volume);

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(1);
          expect(props.changeMuteStatus).toHaveBeenCalledWith(false);
        });
      });

      describe('volume = 0, isMuted = false', () => {
        it('should call changeMuteStatus and changeMuteStatus', () => {
          const volume = 0;

          instance.handleVolumeChange(volume);

          expect(props.changeVolume).toHaveBeenCalledTimes(1);
          expect(props.changeVolume).toHaveBeenCalledWith(volume);

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(1);
          expect(props.changeMuteStatus).toHaveBeenCalledWith(true);
        });
      });

      describe('volume = 0, isMuted = true', () => {
        it('should call changeMuteStatus', () => {
          const volume = 0;

          wrapper.setProps({ ...props, isMuted: true });
          instance.handleVolumeChange(volume);

          expect(props.changeVolume).toHaveBeenCalledTimes(1);
          expect(props.changeVolume).toHaveBeenCalledWith(volume);

          expect(props.changeMuteStatus).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
