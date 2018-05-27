import configureStore from 'redux-mock-store';

import PlayButtonConnector from '../connectors/PlayButtonConnector';
import { PlayButtonContainer } from '../containers';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../containers', () => ({
  PlayButtonContainer: () => null,
}));

describe('PlayButtonConnector', () => {
  let wrapper;
  let initialState;

  beforeAll(() => {
    initialState = {
      isPlaying: false,
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(PlayButtonConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with PlayButtonContainer', () => {
      expect(wrapper.is(PlayButtonContainer)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('isPlaying', () => {
      it('should pass isPlaying', () => {
        expect(wrapper.prop('isPlaying')).toEqual(initialState.isPlaying);
      });
    });

    describe('changePlaybackStatus', () => {
      it('should pass changePlaybackStatus', () => {
        expect(wrapper.prop('changePlaybackStatus')).toEqual(expect.any(Function));
      });
    });
  });
});
