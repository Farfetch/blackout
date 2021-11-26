import * as fromAuthentication from '../reducer';
import * as selectors from '../selectors';
import { mockResponse as mockUserEntity } from 'tests/__fixtures__/authentication';

describe('authentication redux selectors', () => {
  const mockUserId = 29556478;
  const mockState = {
    authentication: {
      error: 'error: not loaded',
      isLoading: false,
      id: mockUserId,
      login: {
        error: null,
        isLoading: false,
      },
      logout: {
        error: null,
        isLoading: false,
      },
      register: {
        error: null,
        isLoading: false,
      },
      changePassword: {
        error: null,
        isLoading: false,
      },
      recoverPassword: {
        error: null,
        isLoading: false,
      },
      resetPassword: {
        error: null,
        isLoading: false,
      },
      validateEmail: {
        error: null,
        isLoading: false,
      },
      refreshEmailToken: {
        error: null,
        isLoading: false,
      },
      userToken: {
        result: null,
        error: null,
        isLoading: false,
      },
      userImpersonation: {
        result: null,
        error: null,
        isLoading: false,
      },
    },
    entities: {
      user: mockUserEntity,
    },
  };

  const subAreaNames = [
    'Login',
    'Logout',
    'ChangePassword',
    'RecoverPassword',
    'ResetPassword',
    'Register',
    'ValidateEmail',
    'UserToken',
    'UserImpersonation',
    'RefreshEmailToken',
  ];

  beforeEach(jest.clearAllMocks);

  describe('isAuthenticationLoading()', () => {
    it('should get the authentication isLoading property from state', () => {
      const spy = jest.spyOn(fromAuthentication, 'getIsLoading');

      expect(selectors.isAuthenticationLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('sub-areas loading selectors', () => {
    it.each(subAreaNames)('should handle is%sLoading selector', subArea => {
      const selectorName = `is${subArea}Loading`;
      expect(selectors[selectorName](mockState)).toEqual(false);
    });
  });

  describe('sub-areas error selectors', () => {
    it.each(subAreaNames)('should handle get%sError selector', subArea => {
      const selectorName = `get${subArea}Error`;
      const reducerSubAreaName =
        subArea.charAt(0).toLowerCase() + subArea.slice(1);
      const expectedResult = mockState.authentication[reducerSubAreaName].error;

      expect(selectors[selectorName](mockState)).toBe(expectedResult);
    });
  });

  describe('sub-areas with result', () => {
    it.each(['UserToken', 'UserImpersonation'])(
      'should handle get%sResult selector',
      subArea => {
        const selectorName = `get${subArea}Result`;
        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);
        const expectedResult =
          mockState.authentication[reducerSubAreaName].result;

        expect(selectors[selectorName](mockState)).toBe(expectedResult);
      },
    );
  });

  describe('isAuthenticated()', () => {
    it('should get the authentication isAuthenticated property from state', () => {
      expect(selectors.isAuthenticated(mockState)).toEqual(true);
    });
  });

  describe('getAuthenticationError()', () => {
    it('should get the authentication error property from state', () => {
      const expectedResult = mockState.authentication.error;
      const spy = jest.spyOn(fromAuthentication, 'getError');

      expect(selectors.getAuthenticationError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
