type Items = {
  [key: string]: string;
};

export type GenericDetails = {
  items: Items;
};

export type ReferralDetails = {
  referralToken: string;
  rewardsCardNumber: string;
  joinRewards: boolean;
};

export type UserAttributesResponse = {
  id: string;
  type: string;
  channelCode: string;
  tenantId: number;
  userId: number;
  details: GenericDetails | ReferralDetails;
};
