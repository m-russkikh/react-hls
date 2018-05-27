import configureStore from 'redux-mock-store';

import TimerConnector from '../connectors/TimerConnector';
import { TimerView } from '../views';
import { getShallowWrapper } from '../../../utils/testUtils';


jest.mock('../views', () => ({
  TimerView: () => null,
}));

describe('TimerConnector', () => {
  let wrapper;
  let initialState;

  beforeAll(() => {
    initialState = {
      currentTime: 'some time',
    };

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    wrapper = getShallowWrapper(TimerConnector, {}, {context: {store}});
  });

  describe('root element', () => {
    it('should be presented with TimerView', () => {
      expect(wrapper.is(TimerView)).toBeTruthy();
    });
  });

  describe('props', () => {
    describe('currentTime', () => {
      it('should pass currentTime', () => {
        expect(wrapper.prop('currentTime')).toEqual(initialState.currentTime);
      });
    });
  });
});
