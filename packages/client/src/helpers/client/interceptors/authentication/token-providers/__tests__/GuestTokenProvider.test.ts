import GuestTokenProvider from '../GuestTokenProvider.js';
import type { ITokenData } from '../types/TokenData.types.js';

jest.useFakeTimers();

describe('GuestTokenProvider', () => {
  describe('setTokenContext', () => {
    it('should not set token data if the new token context is equal to the current token context', () => {
      const requester = jest.fn();
      const tokenContext = { contextProp1: 'dummy', contextProp2: 'dummy' };
      const instance = new GuestTokenProvider(requester);
      const setTokenDataSpy = jest.spyOn(instance, 'setTokenData');

      instance.setTokenContext(tokenContext);

      expect(setTokenDataSpy).toHaveBeenCalledWith(null);

      jest.clearAllMocks();

      // Clone the object to test a deep comparison instead of a reference one
      const tokenContextClone = { ...tokenContext };

      instance.setTokenContext(tokenContextClone);

      expect(setTokenDataSpy).not.toHaveBeenCalled();
    });
  });

  describe('getAccessToken', () => {
    it('should not set token data if the token context has changed between requests', async () => {
      const requester = jest.fn(() => {
        return new Promise<ITokenData>(resolve => {
          resolve({
            accessToken: 'dummy_access_token',
            expiresIn: '12000',
          });
        });
      });

      const instance = new GuestTokenProvider(requester);
      const setTokenDataSpy = jest.spyOn(instance, 'setTokenData');
      const getAccessTokenPromise = instance.getAccessToken(false);

      instance.setTokenContext({ contextProp1: 'dummy' });

      // Clear all mocks because the call to setTokenContext will call setTokenData
      jest.clearAllMocks();

      // Force the setTimeout to run, so that the promise can be resolved
      jest.runAllTimers();

      await getAccessTokenPromise;

      expect(setTokenDataSpy).not.toHaveBeenCalled();
    });
  });

  describe('getCachedAccessToken', () => {
    it('should return the access token from cache if available', async () => {
      const accessToken = 'dummy_access_token';

      const requester = jest.fn(() => {
        return new Promise<ITokenData>(resolve => {
          resolve({
            accessToken: 'dummy_access_token',
          });
        });
      });

      const instance = new GuestTokenProvider(requester);

      expect(instance.getCachedAccessToken()).toBeUndefined();

      const receivedAccessToken = await instance.getAccessToken(false);

      expect(receivedAccessToken).toEqual(accessToken);

      const getAccessTokenSpy = jest.spyOn(instance, 'getAccessToken');
      const cachedAccessToken = instance.getCachedAccessToken();

      expect(cachedAccessToken).toEqual(accessToken);

      expect(getAccessTokenSpy).not.toHaveBeenCalled();
    });
  });
});
