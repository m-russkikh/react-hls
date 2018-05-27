import { getShallowWrapper } from '../../../utils/testUtils';
import AbstractButtonView from '../views/AbstractButtonView';


describe('AbstractButtonView', () => {
  const className = 'button';

  describe('root element', () => {
    let wrapper;
    let props;

    beforeAll(() => {
      props = {
        className: 'some class',
        onClick: jest.fn(),
      };

      wrapper = getShallowWrapper(AbstractButtonView, props);
    });

    it('should be presented with div', () => {
      expect(wrapper.is('div')).toBeTruthy();
    });

    describe('props', () => {
      describe('className', () => {
        it('should be correct', () => {
          const result = `${className} ${props.className}`

          expect(wrapper.hasClass(result)).toBeTruthy();
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

  describe('by default', () => {
    let wrapper;
    let props;

    beforeAll(() => {
      props = {
        onClick: jest.fn(),
      };

      wrapper = getShallowWrapper(AbstractButtonView, props);
    });

    it('should have correct default class name', () => {
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });
});
