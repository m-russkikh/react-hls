import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {},
  }),
}));

export default axios;
