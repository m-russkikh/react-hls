import Hls from 'hls.js';

jest.mock('hls.js', () => () => ({
  attachMedia: jest.fn(),
  destroy: jest.fn(),
  isSupported: jest.fn(),
  loadSource: jest.fn(),
  on: jest.fn(),
  startLoad: jest.fn(),
}));

Hls.isSupported = jest.fn(() => true);
Hls.Events = {
  MEDIA_ATTACHED: 'MEDIA_ATTACHED',
  MANIFEST_PARSED: 'MANIFEST_PARSED',
  ERROR: 'ERROR',
};

export default Hls;