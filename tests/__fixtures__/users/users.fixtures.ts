export const userId = 123456;
export const contactId = '78910';
export const personalId = '123456';
export const attributeId = '123456';

export const mockUsersResponse = {
  bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
  dateOfBirth: '/Date(631152000000)/',
  email: 'teste@conta.com',
  gender: 0,
  id: 29538482,
  title: {
    id: '111',
    value: 'Dr.',
  },
  name: 'Ivo Mota',
  phoneNumber: '910000000',
  segments: [],
  username: 'teste@conta.com',
  wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
  isExternalLogin: false,
  genders: ['NotDefined', 'Male', 'Female'],
  genderId: 0,
};

export const expectedNormalizedUserPayload = {
  entities: {
    user: {
      bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
      dateOfBirth: '/Date(631152000000)/',
      email: 'teste@conta.com',
      gender: 0,
      genderId: 0,
      genders: ['NotDefined', 'Male', 'Female'],
      id: 29538482,
      isExternalLogin: false,
      name: 'Ivo Mota',
      phoneNumber: '910000000',
      segments: [],
      username: 'teste@conta.com',
      wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
      title: {
        id: '111',
        value: 'Dr.',
      },
    },
  },
  result: 29538482,
};

export const mockUserAttributesResponse = {
  id: '',
  type: '',
  channelCode: '',
  tenantId: 0,
  userId: 0,
  details: {
    referralToken: '',
    rewardsCardNumber: '',
    joinRewards: false,
  },
};

export const mockUserAttributesData = {
  id: '',
  type: '',
  channelCode: '',
  tenantId: 0,
  userId: 0,
  details: {
    referralToken: '',
    rewardsCardNumber: '',
    joinRewards: false,
  },
};

export const mockUserInitialState = {
  benefits: {
    error: null,
    isLoading: false,
  },
  contacts: {
    error: null,
    isLoading: false,
  },
  credit: {
    error: null,
    isLoading: false,
  },
  creditMovements: {
    error: null,
    isLoading: false,
  },
  error: null,
  isLoading: false,
  preferences: {
    error: null,
    isLoading: false,
  },
  result: null,
  titles: {
    error: null,
    isLoading: false,
  },
  updatePreferences: {
    error: null,
    isLoading: false,
  },
  userAttributes: {
    result: null,
    error: null,
    isLoading: false,
  },
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
    resetPassword: {
      error: null,
      isLoading: false,
    },
    recoverPassword: {
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
  },
};

export const mockGuestUserEntities = {
  user: {
    bagId: 'b081c2eb-a61e-44f6-8462-5fc84e5d8995',
    dateOfBirth: null,
    email: null,
    gender: null,
    id: 5000015566032863,
    title: null,
    name: null,
    phoneNumber: null,
    phoneNumberConfirmed: false,
    segments: null,
    username: null,
    wishlistId: '5dc7babb-3cb2-43cb-9c50-6152e1e4be82',
    isExternalLogin: false,
    isGuest: true,
    guestBagItemsMerged: 0,
    status: 0,
    lastName: null,
    firstName: null,
    bag: null,
    wishlist: null,
    membership: null,
  },
};

export const mockAuthenticatedUserEntities = {
  user: {
    bagId: 'ada57d80-62a7-4cb4-8de4-f8937fe53213',
    dateOfBirth: '/Date(636854400000)/',
    email: 'user.name@test.com',
    gender: 1,
    id: 56681854,
    title: null,
    name: 'User Name',
    phoneNumber: '',
    phoneNumberConfirmed: false,
    segments: [],
    username: 'user.name@test.com',
    wishlistId: '5d5ac3ee-62f3-46e3-a243-d7bc1d0c328d',
    isExternalLogin: false,
    isGuest: false,
    guestBagItemsMerged: 0,
    status: 4,
    lastName: 'Name',
    firstName: 'User',
    bag: null,
    wishlist: null,
    membership: null,
    loyalty: null,
    createdDate: '/Date(1601300185332)/',
    updatedDate: '/Date(1655722263553)/',
  },
};
