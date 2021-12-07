import TokenData from '../TokenData';

describe('TokenData', () => {
  it('should throw if data is not set when creating a new instance', () => {
    expect(() => new TokenData()).toThrow('');
  });
});
