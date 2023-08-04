import {
  UserGender,
  UserStatus,
  UserStatusLegacy,
} from '@farfetch/blackout-client';

export const id = '1';
export const userId = 123123;
export const mockResponse = {
  bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
  dateOfBirth: undefined,
  email: 'pepe@acme.com',
  gender: UserGender.Male,
  id: 29556478,
  name: 'Pepe',
  title: {
    id: '111',
    value: 'Dr.',
  },
  phoneNumber: undefined,
  segments: [],
  username: 'pepe@acme.com',
  wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
  countryCode: 'PT',
};

export const mockUnverifiedUserResponse = {
  bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
  dateOfBirth: undefined,
  email: 'pepe@acme.com',
  gender: UserGender.Male,
  id: 0,
  name: 'Pepe',
  title: {
    id: '111',
    value: 'Dr.',
  },
  status: UserStatus.PendingEmailConfirmation,
  phoneNumber: undefined,
  segments: [],
  username: 'pepe@acme.com',
  wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
};

export const mockUnverifiedUserLegacyResponse = {
  ...mockUnverifiedUserResponse,
  status: UserStatusLegacy.PendingEmailConfirmation,
};

export const expectedNormalizedPayload = {
  entities: {
    user: {
      bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
      dateOfBirth: undefined,
      email: 'pepe@acme.com',
      gender: UserGender.Male,
      id: 29556478,
      name: 'Pepe',
      title: {
        id: '111',
        value: 'Dr.',
      },
      phoneNumber: undefined,
      segments: [],
      username: 'pepe@acme.com',
      wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
      isExternalLogin: false,
      isGuest: false,
      guestBagItemsMerged: 0,
    },
  },
  result: 29556478,
};

export const expectedNormalizedSocialLoginPayload = {
  entities: {
    user: {
      bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
      dateOfBirth: undefined,
      email: 'pepe@acme.com',
      gender: UserGender.Male,
      id: 29556478,
      name: 'Pepe',
      title: {
        id: '111',
        value: 'Dr.',
      },
      phoneNumber: undefined,
      segments: [],
      username: 'pepe@acme.com',
      wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
      isExternalLogin: false,
      isGuest: false,
      guestBagItemsMerged: 0,
    },
  },
};

export const mockInitialState = {
  socialLogin: {
    isLoading: {},
    error: {},
    result: {},
  },
};

export const mockAuthenticationState = {
  users: {
    authentication: {
      error: null,
      id: null,
      isLoading: false,
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
    },
  },
};

export const mockGetUserExternalLoginsResponse = [
  {
    id: '',
    provider: '',
    providerUserId: '',
  },
  {
    id: '',
    provider: '',
    providerUserId: '',
  },
];
