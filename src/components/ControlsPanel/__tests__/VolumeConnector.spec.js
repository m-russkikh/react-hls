import configureStore from 'redux-mock-store';

import VolumeConnector from '../connectors/VolumeConnector';
import { VolumeContainer } from '../containers';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../containers', () => ({
  VolumeContainer: () => null,
}));

describe('VolumeConnector', () => {
  let initialState;
  let wrapper;

  beforeAll(() => {
    initialState = {
      isMuted: false,
      volume: 70,
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(VolumeConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with VolumeContainer', () => {
      expect(wrapper.is(VolumeContainer)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('isMuted', () => {
      it('should pass isMuted', () => {
        expect(wrapper.prop('isMuted')).toEqual(initialState.isMuted);
      });
    });

    describe('volume', () => {
      it('should pass volume', () => {
        expect(wrapper.prop('volume')).toEqual(initialState.volume);
      });
    });

    describe('changeMuteStatus', () => {
      it('should pass changeMuteStatus', () => {
        expect(wrapper.prop('changeMuteStatus')).toEqual(expect.any(Function));
      });
    });

    describe('changeVolume', () => {
      it('should pass changeVolume', () => {
        expect(wrapper.prop('changeVolume')).toEqual(expect.any(Function));
      });
    });
  });
});
