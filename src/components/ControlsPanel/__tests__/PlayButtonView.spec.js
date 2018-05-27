import { getShallowWrapper } from '../../../utils/testUtils';
import PlayButtonView from '../views/PlayButtonView';
import AbstractButtonView from '../views/AbstractButtonView';


jest.mock('../views/AbstractButtonView');

describe('PlayButtonView', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      isPlaying: false,
      onClick: jest.fn(),
    };
    wrapper = getShallowWrapper(PlayButtonView, props);
  });

  describe('root element', () => {
    it('should be presented with AbstractButtonView', () => {
      expect(wrapper.is(AbstractButtonView)).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should be correct for pause mode', () => {
          expect(wrapper.hasClass('play')).toBeTruthy();
        });

        it('should be correct for play mode', () => {
          wrapper.setProps({ ...props, isPlaying: true });

          expect(wrapper.hasClass('pause')).toBeTruthy();
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
