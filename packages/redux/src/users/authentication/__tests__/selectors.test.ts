import * as fromAuthentication from '../reducer.js';
import * as selectors from '../selectors.js';
import { mockResponse as mockUserEntity } from 'tests/__fixtures__/authentication/index.mjs';
import { mockUserInitialState } from 'tests/__fixtures__/users/index.mjs';
import type { AuthenticationState } from '../types/index.js';
import type { CamelCase } from '../../../types/utils/camelCase.types.js';

describe('authentication redux selectors', () => {
  const mockUserId = 29556478;
  const mockState = {
    users: {
      ...mockUserInitialState,
      isGuest: false,
      id: mockUserId,
      authentication: {
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
        token: {
          result: null,
          error: null,
          isLoading: false,
        },
        externalLogins: {
          result: null,
          error: null,
          isLoading: false,
        },
      },
    },
    addresses: {
      predictions: {
        error: null,
        isLoading: false,
        result: null,
      },
      prediction: {
        error: null,
        isLoading: false,
        result: null,
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
    'Token',
    'RefreshEmailToken',
  ] as const;

  beforeEach(jest.clearAllMocks);

  describe('sub-areas loading selectors', () => {
    it.each(subAreaNames)('should handle is%sLoading selector', subArea => {
      const selectorName = `is${subArea}Loading`;

      expect(selectors[selectorName as keyof typeof selectors](mockState)).toBe(
        false,
      );
    });
  });

  describe('sub-areas error selectors', () => {
    it.each(subAreaNames)('should handle get%sError selector', subArea => {
      const selectorName = `get${subArea}Error`;
      const reducerSubAreaName =
        subArea.charAt(0).toLowerCase() + subArea.slice(1);
      const expectedResult =
        mockState.users.authentication[
          reducerSubAreaName as keyof AuthenticationState
        ].error;

      expect(selectors[selectorName as keyof typeof selectors](mockState)).toBe(
        expectedResult,
      );
    });
  });

  const subAreasWithResult = ['Token', 'ExternalLogins'] as const;

  describe('sub-areas with result', () => {
    it.each(subAreasWithResult)(
      'should handle get%sResult selector',
      subArea => {
        const selectorName = `get${subArea}Result` as const;
        const reducerSubAreaName = `${subArea
          .charAt(0)
          .toLowerCase()}${subArea.slice(1)}` as CamelCase<typeof subArea>;
        const expectedResult =
          mockState.users.authentication[reducerSubAreaName].result;

        expect(
          selectors[selectorName as keyof typeof selectors](mockState),
        ).toBe(expectedResult);
      },
    );
  });

  describe('isAuthenticated()', () => {
    it('should get the authentication isAuthenticated property from state', () => {
      expect(selectors.isAuthenticated(mockState)).toBe(true);
    });
  });

  describe('areExternalLoginsLoading()', () => {
    it('should get the external logins loading property from state', () => {
      const expectedResult =
        mockState.users.authentication.externalLogins.isLoading;
      const spy = jest.spyOn(fromAuthentication, 'getExternalLogins');

      expect(selectors.areExternalLoginsLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExternalLoginsError()', () => {
    it('should get the external logins error property from state', () => {
      const expectedResult =
        mockState.users.authentication.externalLogins.error;
      const spy = jest.spyOn(fromAuthentication, 'getExternalLogins');

      expect(selectors.getExternalLoginsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
