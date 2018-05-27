import { getShallowWrapper } from '../../../utils/testUtils';
import { FullScreenButtonContainer } from '../containers';
import { FullScreenButtonView } from '../views';


jest.mock('../views', () => ({
  FullScreenButtonView: () => null
}));

describe('FullScreenButtonContainer', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      isFullscreen: false,
      changeFullscreenStatus: jest.fn(),
    };

    wrapper = getShallowWrapper(FullScreenButtonContainer, props);
  });

  describe('root element', () => {
    it('should be presented with FullScreenButtonView', () => {
      expect(wrapper.is(FullScreenButtonView)).toBeTruthy();
    });

    describe('props', () => {
      describe('isFullscreen', () => {
        it('should taken from parent component props', () => {
          expect(wrapper.prop('isFullscreen')).toBe(props.isFullscreen);
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          wrapper.simulate('click')

          expect(props.changeFullscreenStatus).toHaveBeenCalledTimes(1);
          expect(props.changeFullscreenStatus).toHaveBeenCalledWith(!props.isFullscreen);
        });
      });
    });
  });
});
