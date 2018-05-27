import { getShallowWrapper } from '../../../utils/testUtils';
import ControlsPanelView from '../views/ControlsPanelView';
import {
  PlayButtonConnector,
  VolumeConnector,
  FullScreenButtonConnector,
  TimerConnector,
} from '../connectors';


jest.mock('../connectors/PlayButtonConnector');
jest.mock('../connectors/VolumeConnector');
jest.mock('../connectors/FullScreenButtonConnector');
jest.mock('../connectors/TimerConnector');

describe('ControlsPanelView', () => {
  const className = 'controls-panel';
  let wrapper;

  beforeAll(() => {
    wrapper = getShallowWrapper(ControlsPanelView);
  });

  describe('root element', () => {
    it('should be presented with div', () => {
      expect(wrapper.is('div')).toBeTruthy();
    });

    it('should have correct class name', () => {
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });

  describe('PlayButtonConnector', () => {
    it('should contain PlayButtonConnector', () => {
      expect(wrapper.find(PlayButtonConnector)).toHaveLength(1);
    });
  });

  describe('VolumeConnector', () => {
    it('should contain VolumeConnector', () => {
      expect(wrapper.find(VolumeConnector)).toHaveLength(1);
    });
  });

  describe('FullScreenButtonConnector', () => {
    it('should contain FullScreenButtonConnector', () => {
      expect(wrapper.find(FullScreenButtonConnector)).toHaveLength(1);
    });
  });

  describe('TimerConnector', () => {
    it('should contain TimerConnector', () => {
      expect(wrapper.find(TimerConnector)).toHaveLength(1);
    });
  });
});
