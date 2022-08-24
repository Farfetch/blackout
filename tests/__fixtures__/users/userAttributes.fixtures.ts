import { UserAttributeType } from '@farfetch/blackout-client';
import { userId } from '../users';

export const mockGetUserAttributesResponse = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    type: 'Generic',
    channelCode: 'string',
    tenantId: 0,
    userId: 0,
    details: {},
  },
];

export const mockPostUserAttributesResponse = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  type: 'Generic',
  channelCode: 'string',
  tenantId: 0,
  userId: 0,
  details: {},
};

export const mockCreateUserAttributesData = {
  userId,
  type: UserAttributeType.Generic,
  channelCode: 'channel_abc',
  details: {
    key1: 'value1',
    key2: 'value2',
  },
};
