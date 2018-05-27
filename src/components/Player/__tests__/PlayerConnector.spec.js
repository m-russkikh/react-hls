import configureStore from 'redux-mock-store';

import PlayerConnector from '../connectors/PlayerConnector';
import { PlayerContainer } from '../containers';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../containers', () => ({
  PlayerContainer: () => null,
}));

describe('PlayerConnector', () => {
  let initialState;
  let wrapper;

  beforeAll(() => {
    initialState = {
      isFullscreen: false,
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(PlayerConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with PlayerContainer', () => {
      expect(wrapper.is(PlayerContainer)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('isFullscreen', () => {
      it('should pass isFullscreen', () => {
        expect(wrapper.prop('isFullscreen')).toBe(initialState.isFullscreen);
      });
    });
  });
});
