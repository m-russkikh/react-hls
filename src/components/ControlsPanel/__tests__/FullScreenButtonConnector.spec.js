import configureStore from 'redux-mock-store';

import FullScreenButtonConnector from '../connectors/FullScreenButtonConnector';
import { FullScreenButtonContainer } from '../containers';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../containers', () => ({
  FullScreenButtonContainer: () => null,
}));

describe('FullScreenButtonConnector', () => {
  let wrapper;
  let initialState;

  beforeAll(() => {
    initialState = {
      isFullscreen: false,
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(FullScreenButtonConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with FullScreenButtonContainer', () => {
      expect(wrapper.is(FullScreenButtonContainer)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('isFullscreen', () => {
      it('should pass isFullscreen', () => {
        expect(wrapper.prop('isFullscreen')).toEqual(initialState.isFullscreen);
      });
    });

    describe('changeFullscreenStatus', () => {
      it('should pass changeFullscreenStatus', () => {
        expect(wrapper.prop('changeFullscreenStatus')).toEqual(expect.any(Function));
      });
    });
  });
});
