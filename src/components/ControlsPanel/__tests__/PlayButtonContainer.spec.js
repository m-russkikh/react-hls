import { getShallowWrapper } from '../../../utils/testUtils';
import { PlayButtonContainer } from '../containers';
import { PlayButtonView } from '../views';


jest.mock('../views', () => ({
  PlayButtonView: () => null
}));

describe('PlayButtonContainer', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      isPlaying: false,
      changePlaybackStatus: jest.fn(),
    };
    wrapper = getShallowWrapper(PlayButtonContainer, props);
  });

  describe('root element', () => {
    it('should be presented with PlayButtonView', () => {
      expect(wrapper.is(PlayButtonView)).toBeTruthy();
    });

    describe('props', () => {
      describe('isPlaying', () => {
        it('should taken from parent component props', () => {
          expect(wrapper.prop('isPlaying')).toBe(props.isPlaying);
        });
      });

      describe('onClick', () => {
        it('should handle click event', () => {
          wrapper.simulate('click')

          expect(props.changePlaybackStatus).toHaveBeenCalledTimes(1);
          expect(props.changePlaybackStatus).toHaveBeenCalledWith(!props.isPlaying);
        });
      });
    });
  });

});
