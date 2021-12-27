import type {
  GenericDetails,
  ReferralDetails,
} from './userAttributesResponse.types';

export type UserAttributesData = {
  type: string;
  channelCode: string;
  userId: number;
  details: GenericDetails | ReferralDetails;
};
