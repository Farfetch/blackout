import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/index.js';

export type UserBenefit = {
  id: string;
  code: string;
  isActive: boolean;
  metadata: UserBenefitMetadata;
  benefitType: string;
};

export type UserBenefitMetadata = Record<string, string>;

export type GetUserBenefits = (
  userId: User['id'],
  config?: Config,
) => Promise<UserBenefit[]>;
