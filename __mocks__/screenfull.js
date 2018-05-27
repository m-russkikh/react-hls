import screenfull from 'screenfull';

jest.mock('screenfull', () => ({
  enabled: true,
  toggle: jest.fn(),
}));

export default screenfull;
