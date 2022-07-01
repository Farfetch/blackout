export const id = '1';
export const userId = 123123;
export const mockResponse = {
  bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
  dateOfBirth: null,
  email: 'pepe@acme.com',
  gender: 0,
  id: 29556478,
  name: 'Pepe',
  title: {
    id: '111',
    value: 'Dr.',
  },
  phoneNumber: null,
  segments: [],
  username: 'pepe@acme.com',
  wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
};

export const mockUnverifiedUserResponse = {
  bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
  dateOfBirth: null,
  email: 'pepe@acme.com',
  gender: 0,
  id: 0,
  name: 'Pepe',
  title: {
    id: '111',
    value: 'Dr.',
  },
  status: 4,
  phoneNumber: null,
  segments: [],
  username: 'pepe@acme.com',
  wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
};

export const expectedNormalizedPayload = {
  entities: {
    user: {
      bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
      dateOfBirth: null,
      email: 'pepe@acme.com',
      gender: 0,
      id: 29556478,
      name: 'Pepe',
      title: {
        id: '111',
        value: 'Dr.',
      },
      phoneNumber: null,
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
};
