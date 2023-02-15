import {
  PatchUserAttributeData,
  UserAttributeType,
} from '@farfetch/blackout-client';

export const mockGetUserAttributeResponse = {};

export const mockPutUserAttributeResponse = {};

export const mockPatchUserAttributeResponse = {};

export const mockDeleteUserAttributeResponse = {};

export const mockUpdateUserAttributeData: PatchUserAttributeData[] = [
  {
    op: 'replace',
    path: 'details/items/key2',
    value: '362251',
  },
];

export const mockSetUSerAttributeData = {
  type: UserAttributeType.Generic,
  channelCode: '',
  userId: 123,
  details: {
    referralToken: '',
    rewardsCardNumber: '',
    joinRewards: false,
  },
};
