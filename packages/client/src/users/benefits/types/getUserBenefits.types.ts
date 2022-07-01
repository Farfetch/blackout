import type { Config } from '../../../types';

export type UserBenefit = {
  id: string;
  code: string;
  isActive: boolean;
  metadata: UserBenefitMetadata;
  benefitType: string;
};

export type UserBenefitMetadata = Record<string, string>;

export type GetUserBenefits = (config?: Config) => Promise<UserBenefit[]>;
