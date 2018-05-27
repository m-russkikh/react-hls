import { formatTime } from '../';


describe('formatTime', () => {
  it('should return minutes and seconds', () => {
    expect(formatTime(1000)).toBe('16:40');
  });

  it('should return hours, minutes and seconds', () => {
    expect(formatTime(100000)).toBe('27:46:40');
  });

  it('should return time with leading zeros', () => {
    expect(formatTime(7500)).toBe('02:05:00');
  });
});