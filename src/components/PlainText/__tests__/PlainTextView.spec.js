import { getShallowWrapper } from '../../../utils/testUtils';
import PlainTextView from '../views/PlainTextView';


describe('PlainTextView', () => {
  let wrapper;
  let props;

  beforeAll(() => {
    props = {
      children: 'children',
      className: 'className',
    };

    wrapper = getShallowWrapper(PlainTextView, props);
  });

  describe('root element', () => {
    it('should be presented with span', () => {
      expect(wrapper.is('span')).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should be correct', () => {
          expect(wrapper.prop('className')).toBe(props.className);
        });
      });

      describe('children', () => {
        it('should be correct', () => {
          expect(wrapper.children().text()).toBe(props.children);
        });
      });
    });
  });
});
