import * as selectors from '../selectors';
import { mockResponse as mockUserEntity } from 'tests/__fixtures__/authentication';
import type { AuthenticationState, UserData } from '../types';

describe('authentication redux selectors', () => {
  const mockUserId = 29556478;
  const mockState = {
    users: {
      isGuest: false,
      id: mockUserId,
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

  describe('sub-areas loading selectors', () => {
    it.each(subAreaNames)('should handle is%sLoading selector', subArea => {
      const selectorName = `is${subArea}Loading`;
      expect(
        selectors[selectorName as keyof typeof selectors](mockState),
      ).toEqual(false);
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

  describe('sub-areas with result', () => {
    it.each(['UserToken', 'UserImpersonation'])(
      'should handle get%sResult selector',
      subArea => {
        const selectorName = `get${subArea}Result`;
        const reducerSubAreaName =
          subArea.charAt(0).toLowerCase() + subArea.slice(1);
        const expectedResult =
          mockState.users.authentication[reducerSubAreaName as keyof UserData]
            .result;

        expect(
          selectors[selectorName as keyof typeof selectors](mockState),
        ).toBe(expectedResult);
      },
    );
  });

  describe('isAuthenticated()', () => {
    it('should get the authentication isAuthenticated property from state', () => {
      expect(selectors.isAuthenticated(mockState)).toEqual(true);
    });
  });
});
