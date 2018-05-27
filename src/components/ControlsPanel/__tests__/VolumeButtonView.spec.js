import { getShallowWrapper } from '../../../utils/testUtils';
import VolumeButtonView from '../views/VolumeButtonView';
import AbstractButtonView from '../views/AbstractButtonView';


jest.mock('../views/AbstractButtonView');

describe('VolumeButtonView', () => {
  const className = 'volume';
  let wrapper;
  let props;

  beforeAll(() => {
    props = {
      isMuted: false,
      onClick: jest.fn(),
    };

    wrapper = getShallowWrapper(VolumeButtonView, props);
  });

  describe('root element', () => {
    it('should be presented with AbstractButtonView', () => {
      expect(wrapper.is(AbstractButtonView)).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should be correct for the sound turned on', () => {
          expect(wrapper.hasClass(className)).toBeTruthy();
        });

        it('should be correct for mute mode', () => {
          const result = `${className} off`;

          wrapper.setProps({ ...props, isMuted: true });

          expect(wrapper.hasClass(result)).toBeTruthy();
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          wrapper.simulate('click')

          expect(props.onClick).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
