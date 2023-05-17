export type GenericDetails = Record<string, string>;

export enum UserAttributeType {
  Generic = 'Generic',
  Referrals = 'Referrals',
}

export type ReferralDetails = {
  referralToken: string;
  rewardsCardNumber: string;
  joinRewards: boolean;
};

export type UserAttribute = {
  id: string;
  type: UserAttributeType;
  channelCode: string;
  tenantId: number;
  userId: number;
  details: GenericDetails | ReferralDetails;
};
