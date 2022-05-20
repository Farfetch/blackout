import { isLocalNetwork } from '../../Zaraz/utils';

describe('isLocalNetwork', () => {
  it('should return false if the hostname is not passed', () => {
    expect(isLocalNetwork()).toBe(false);
  });

  it('should return true if the hostname is from a local network', () => {
    expect(isLocalNetwork('127.0.0.1')).toBe(true);
    expect(isLocalNetwork('localhost')).toBe(true);
    expect(isLocalNetwork('192.168.10.1')).toBe(true);
    expect(isLocalNetwork('::1')).toBe(true);
    expect(isLocalNetwork('10.0.0.1')).toBe(true);
    expect(isLocalNetwork('host.local')).toBe(true);
  });

  it('should return false if the hostname is not from a local network', () => {
    expect(isLocalNetwork('84.90.10.120')).toBe(false);
  });
});
