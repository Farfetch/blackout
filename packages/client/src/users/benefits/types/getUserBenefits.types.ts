import type { Config } from '../../types';

export type GetUserBenefitsResponse = {
  id: string;
  code: string;
  isActive: boolean;
  metadata: Record<string, string>;
  benefitType: string;
};

export type GetUserBenefits = (
  config?: Config,
) => Promise<GetUserBenefitsResponse>;
