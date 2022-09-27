import {
  changePassword,
  fetchUser,
  login,
  logout,
  recoverPassword,
  register,
  resetPassword,
  setUser,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import {
  mockAuthenticatedUserEntities,
  mockGuestUserEntities,
  mockUserInitialState,
} from 'tests/__fixtures__/users';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers';
import useUser from '../useUser';

const capitalizeFirstLetter = (string: string) => {
  const firstLetter = string[0]?.toUpperCase();
  const restOfString = string.slice(1);

  return firstLetter + restOfString;
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  changePassword: jest.fn(() => () => Promise.resolve()),
  fetchUser: jest.fn(() => () => Promise.resolve()),
  login: jest.fn(() => () => Promise.resolve()),
  logout: jest.fn(() => () => Promise.resolve()),
  recoverPassword: jest.fn(() => () => Promise.resolve()),
  register: jest.fn(() => () => Promise.resolve()),
  resetPassword: jest.fn(() => () => Promise.resolve()),
  setUser: jest.fn(() => () => Promise.resolve()),
}));

const mockStore = {
  entities: mockAuthenticatedUserEntities,
  users: mockUserInitialState,
};

const attributes = [
  'login',
  'logout',
  'register',
  'changePassword',
  'resetPassword',
  'recoverPassword',
];

const defaultReturn = {
  actions: {
    changePassword: expect.any(Function),
    fetch: expect.any(Function),
    login: expect.any(Function),
    logout: expect.any(Function),
    recoverPassword: expect.any(Function),
    register: expect.any(Function),
    resetPassword: expect.any(Function),
    update: expect.any(Function),
  },
  data: undefined,
  isFetched: false,
  isChangePasswordLoading: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  isRecoverPasswordLoading: false,
  isRegisterLoading: false,
  isResetPasswordLoading: false,
  isUserLoading: false,
  loginError: null,
  logoutError: null,
  recoverPasswordError: null,
  registerError: null,
  resetPasswordError: null,
  userError: null,
  authenticationError: null,
  changePasswordError: null,
};

describe('useUser', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly before user fetch', () => {
    const {
      result: { current },
    } = renderHook(() => useUser(), {
      wrapper: withStore({
        entities: {},
        users: mockUserInitialState,
      }),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly for a guest user', () => {
    const {
      result: { current },
    } = renderHook(() => useUser(), {
      wrapper: withStore({
        entities: mockGuestUserEntities,
        users: mockUserInitialState,
      }),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: mockGuestUserEntities.user,
      isFetched: true,
    });
  });

  it('should return correctly for a authenticated user', () => {
    const {
      result: { current },
    } = renderHook(() => useUser(), {
      wrapper: withStore(mockStore),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: mockAuthenticatedUserEntities.user,
      isFetched: true,
    });
  });

  const loadingTests = [
    {
      name: 'user loading',
      state: { isLoading: true },
      expectedReturn: { isUserLoading: true },
    },
    ...attributes.map(attribute => ({
      name: `${attribute} loading`,
      state: {
        authentication: {
          ...mockUserInitialState.authentication,
          [attribute]: {
            isLoading: true,
            error: null,
          },
        },
      },
      expectedReturn: {
        [`is${capitalizeFirstLetter(attribute)}Loading`]: true,
      },
    })),
  ];

  loadingTests.forEach(testData => {
    it(`should return correctly on ${testData.name}`, () => {
      const {
        result: { current },
      } = renderHook(() => useUser(), {
        wrapper: withStore({
          entities: {},
          users: { ...mockUserInitialState, ...testData.state },
        }),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        ...testData.expectedReturn,
      });
    });
  });

  const errorInstance = toBlackoutError(new Error('dummy error'));

  const errorTests = [
    {
      name: 'user error',
      state: { error: errorInstance },
      expectedReturn: {
        authenticationError: errorInstance,
        userError: errorInstance,
      },
    },
    ...attributes.map(attribute => ({
      name: `${attribute} error`,
      state: {
        authentication: {
          ...mockUserInitialState.authentication,
          [attribute]: {
            isLoading: false,
            error: errorInstance,
          },
        },
      },
      expectedReturn: {
        [`${attribute}Error`]: errorInstance,
      },
    })),
  ];

  errorTests.forEach(testData => {
    it(`should return correctly on ${testData.name}`, () => {
      const {
        result: { current },
      } = renderHook(() => useUser(), {
        wrapper: withStore({
          entities: {},
          users: { ...mockUserInitialState, ...testData.state },
        }),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        ...testData.expectedReturn,
      });
    });
  });

  it('should return correctly on fetch error', () => {
    const {
      result: { current },
    } = renderHook(() => useUser(), {
      wrapper: withStore({
        entities: {},
        users: {
          ...mockUserInitialState,
          error: errorInstance,
        },
      }),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      userError: errorInstance,
      authenticationError: errorInstance,
    });
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is true', () => {
      renderHook(() => useUser({ enableAutoFetch: true }), {
        wrapper: withStore(mockStore),
      });

      expect(fetchUser).toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      expect(fetchUser).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      fetch();

      expect(fetchUser).toHaveBeenCalled();
    });

    it('should call `login` action', () => {
      const {
        result: {
          current: {
            actions: { login: loginAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const loginData = { username: 'test', password: 'pass' };

      loginAction(loginData);

      expect(login).toHaveBeenCalledWith(loginData);
    });

    it('should call `logout` action', () => {
      const {
        result: {
          current: {
            actions: { logout: logoutAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      logoutAction();

      expect(logout).toHaveBeenCalled();
    });

    it('should call `register` action', () => {
      const {
        result: {
          current: {
            actions: { register: registerAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const registerData = {
        email: 'email@email.com',
        name: 'user',
        password: 'pass',
        username: 'email@email.com',
        countryCode: 'PT',
        firstName: 'User',
        lastName: 'Name',
        phoneNumber: '123',
      };

      registerAction(registerData);

      expect(register).toHaveBeenCalledWith(registerData);
    });

    it('should call `changePassword` action', () => {
      const {
        result: {
          current: {
            actions: { changePassword: changePasswordAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const changePasswordData = {
        newPassword: 'new',
        oldPassword: 'old',
        username: 'username',
        userId: 123,
      };

      changePasswordAction(changePasswordData);

      expect(changePassword).toHaveBeenCalledWith(changePasswordData);
    });

    it('should call `resetPassword` action', () => {
      const {
        result: {
          current: {
            actions: { resetPassword: resetPasswordAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const resetPasswordData = {
        password: '123',
        username: 'username',
        token: 'token',
      };

      resetPasswordAction(resetPasswordData);

      expect(resetPassword).toHaveBeenCalledWith(resetPasswordData);
    });

    it('should call `recoverPassword` action', () => {
      const {
        result: {
          current: {
            actions: { recoverPassword: recoverPasswordAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const recoverPasswordData = {
        username: 'username',
      };

      recoverPasswordAction(recoverPasswordData);

      expect(recoverPassword).toHaveBeenCalledWith(recoverPasswordData);
    });

    it('should call `update` action', () => {
      const {
        result: {
          current: {
            actions: { update: updateAction },
          },
        },
      } = renderHook(() => useUser(), {
        wrapper: withStore(mockStore),
      });

      const updateData = {
        name: 'name',
        username: 'username',
        email: 'email@email.com',
        phoneNumber: '123',
        dateOfBirth: 'date/123123123/',
        gender: 'male',
        receiveNewsletters: true,
        personalShopperId: 123,
        titleId: 'Mr',
        firstName: 'firstName',
        lastName: 'lastName',
      };

      const userId = 123456789;

      updateAction(userId, updateData);

      expect(setUser).toHaveBeenCalledWith(userId, updateData);
    });
  });
});
