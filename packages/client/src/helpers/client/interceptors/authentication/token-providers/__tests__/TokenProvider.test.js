import TokenProvider from '../TokenProvider';

class MyTokenProvider extends TokenProvider {}

describe('TokenProvider', () => {
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
      expect(new TokenProvider().canRetrieveTokens()).toBe(false);
    });
  });

  describe('setCanSaveTokenData', () => {
    it('should throw if parameter passed is not a boolean', () => {
      expect(() => new TokenProvider().setCanSaveTokenData({})).toThrow(
        "Called 'setCanSaveTokenData' with a value that is not a boolean: [object Object]",
      );
    });
  });
});
