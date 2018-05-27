import { getShallowWrapper } from '../../../utils/testUtils';
import TimerView from '../views/TimerView';
import PlainText from '../../PlainText';


jest.mock('../../PlainText');

describe('TimerView', () => {
  const className = 'timer';
  let wrapper;
  let props;

  beforeAll(() => {
    props = {
      currentTime: 'some time',
    };

    wrapper = getShallowWrapper(TimerView, props);
  });

  describe('root element', () => {
    it('should be presented with PlainText', () => {
      expect(wrapper.is(PlainText)).toBeTruthy();
    });

    it('should have correct class name', () => {
      expect(wrapper.hasClass(className)).toBeTruthy();
    });

    describe('props', () => {
      describe('children', () => {
        it('should be taken from currentTime property', () => {
          expect(wrapper.children().text()).toBe(props.currentTime);
        });
      });
    });
  });
});
