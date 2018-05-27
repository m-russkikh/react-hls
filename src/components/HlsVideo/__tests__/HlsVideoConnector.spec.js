import configureStore from 'redux-mock-store';

import HlsVideoConnector from '../connectors/HlsVideoConnector';
import { HlsVideoContainer } from '../containers';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../containers', () => ({
  HlsVideoContainer: () => null,
}));

describe('HlsVideoConnector', () => {
  let wrapper;
  let initialState;

  beforeAll(() => {
    initialState = {
      volume: 70,
      isMuted: false,
      isPlaying: false,
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(HlsVideoConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with HlsVideoContainer', () => {
      expect(wrapper.is(HlsVideoContainer)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('volume', () => {
      it('should pass volume', () => {
        expect(wrapper.prop('volume')).toEqual(initialState.volume);
      });
    });

    describe('isMuted', () => {
      it('should pass isMuted', () => {
        expect(wrapper.prop('isMuted')).toEqual(initialState.isMuted);
      });
    });

    describe('isPlaying', () => {
      it('should pass isPlaying', () => {
        expect(wrapper.prop('isPlaying')).toEqual(initialState.isPlaying);
      });
    });

    describe('changeCurrentTime', () => {
      it('should pass changeCurrentTime', () => {
        expect(wrapper.prop('changeCurrentTime')).toEqual(expect.any(Function));
      });
    });

    describe('changePlaybackStatus', () => {
      it('should pass changePlaybackStatus', () => {
        expect(wrapper.prop('changePlaybackStatus')).toEqual(expect.any(Function));
      });
    });

    describe('canPlay', () => {
      it('should pass canPlay', () => {
        expect(wrapper.prop('canPlay')).toEqual(expect.any(Function));
      });
    });
  });
});
