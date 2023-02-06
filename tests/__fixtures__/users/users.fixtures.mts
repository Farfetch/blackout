import {
  type User,
  UserAttributeType,
  UserGender,
  UserStatus,
} from '@farfetch/blackout-client';
import type { UserEntity, UsersState } from '@farfetch/blackout-redux';

export const userId = 29556478;
export const contactId = '78910';
export const personalId = '123456';
export const attributeId = '123456';

export const mockUsersResponse: User = {
  bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
  dateOfBirth: '/Date(631152000000)/',
  email: 'teste@conta.com',
  gender: UserGender.NotDefined,
  id: userId,
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
  countryCode: '0',
  isGuest: false,
};

export const expectedNormalizedUserPayload = {
  entities: {
    user: {
      bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
      dateOfBirth: '/Date(631152000000)/',
      email: 'teste@conta.com',
      gender: UserGender.NotDefined,
      id: userId,
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
      countryCode: '0',
      isGuest: false,
    },
  },
  result: userId,
};

export const mockUserAttributeResponse = {
  id: '',
  type: UserAttributeType.Generic,
  channelCode: '',
  tenantId: 0,
  userId: 0,
  details: {
    referralToken: '',
    rewardsCardNumber: '',
    joinRewards: false,
  },
};

export const mockUserAttributesResponse = [mockUserAttributeResponse];

export const mockUserAttributesData = {
  id: '',
  type: UserAttributeType.Generic,
  channelCode: '',
  tenantId: 0,
  userId: 0,
  details: {
    referralToken: '',
    rewardsCardNumber: '',
    joinRewards: false,
  },
};

export const mockUserInitialState: UsersState = {
  error: null,
  isLoading: false,
  id: null,
  addresses: {
    error: null,
    isLoading: false,
    result: null,
    addresses: {
      error: null,
      isLoading: false,
    },
    address: {
      error: {},
      isLoading: {},
    },
    defaultAddressDetails: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  attributes: {
    result: null,
    error: null,
    isLoading: false,
  },
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
  benefits: {
    error: null,
    isLoading: false,
  },
  contacts: {
    error: null,
    isLoading: false,
  },
  credits: {
    error: null,
    isLoading: false,
  },
  creditMovements: {
    error: null,
    isLoading: false,
  },
  preferences: {
    error: null,
    isLoading: false,
  },
  returns: {
    result: null,
    error: null,
    isLoading: false,
  },
  titles: {
    error: null,
    isLoading: false,
  },
  updatePreferences: {
    error: null,
    isLoading: false,
  },
  personalIds: {
    error: null,
    isLoading: false,
    result: null,
    defaultPersonalId: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
};

export const mockGuestUserEntities = {
  user: {
    bagId: 'b081c2eb-a61e-44f6-8462-5fc84e5d8995',
    dateOfBirth: undefined,
    email: undefined,
    gender: undefined,
    id: 5000015566032863,
    title: undefined,
    name: undefined,
    phoneNumber: undefined,
    phoneNumberConfirmed: false,
    segments: undefined,
    username: undefined,
    wishlistId: '5dc7babb-3cb2-43cb-9c50-6152e1e4be82',
    isExternalLogin: false,
    isGuest: true,
    guestBagItemsMerged: 0,
    status: UserStatus.Active,
    lastName: undefined,
    firstName: undefined,
    bag: null,
    wishlist: null,
    membership: undefined,
    countryCode: 'PT',
  } as UserEntity,
};

export const mockAuthenticatedUserEntities = {
  user: {
    bagId: 'ada57d80-62a7-4cb4-8de4-f8937fe53213',
    dateOfBirth: '/Date(636854400000)/',
    email: 'user.name@test.com',
    gender: UserGender.Male,
    id: 56681854,
    name: 'User Name',
    phoneNumber: '',
    phoneNumberConfirmed: false,
    segments: [],
    username: 'user.name@test.com',
    wishlistId: '5d5ac3ee-62f3-46e3-a243-d7bc1d0c328d',
    isExternalLogin: false,
    isGuest: false,
    guestBagItemsMerged: 0,
    status: UserStatus.PendingEmailConfirmation,
    lastName: 'Name',
    firstName: 'User',
    bag: null,
    wishlist: null,
    membership: undefined,
    loyalty: null,
    createdDate: '/Date(1601300185332)/',
    updatedDate: '/Date(1655722263553)/',
    countryCode: 'PT',
  } as UserEntity,
};
