import { getShallowWrapper } from '../../../utils/testUtils';
import FullScreenButtonView from '../views/FullScreenButtonView';
import AbstractButtonView from '../views/AbstractButtonView';


jest.mock('../views/AbstractButtonView');

describe('FullScreenButtonView', () => {
  const className = 'fullscreen';
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      isFullscreen: false,
      onClick: jest.fn(),
    };

    wrapper = getShallowWrapper(FullScreenButtonView, props);
  });

  describe('root element', () => {
    it('should be presented with AbstractButtonView', () => {
      expect(wrapper.is(AbstractButtonView)).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should be correct for fullscreen mode off', () => {
          expect(wrapper.hasClass(className)).toBeTruthy();
        });

        it('should be correct for fullscreen mode', () => {
          const result = `${className} off`;

          wrapper.setProps({ ...props, isFullscreen: true });

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
