import type { Config } from '../../../types';
import type { User } from '../../authentication';

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
