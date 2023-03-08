import TokenData from '../TokenData.js';

describe('TokenData', () => {
  it('should throw if data is not set when creating a new instance', () => {
    // @ts-expect-error
    expect(() => new TokenData()).toThrow('');
  });
});
