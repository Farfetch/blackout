import TokenProvider from '../TokenProvider.js';

class MyTokenProvider extends TokenProvider {}

describe('TokenProvider', () => {
  const requester = jest.fn();

  describe('virtual methods', () => {
    it('should throw when a virtual method is not overriden by a derived class', () => {
      const instance = new MyTokenProvider(jest.fn());

      expect(() => instance.getSupportedTokenKind()).toThrow(
        'Not implemented exception',
      );

      expect(() => instance.getAccessToken()).toThrow(
        'Not implemented exception',
      );
    });
  });

  describe('canRetrieveTokens', () => {
    it('should return false by default', () => {
      expect(new TokenProvider(requester).canRetrieveTokens()).toBe(false);
    });
  });
});
