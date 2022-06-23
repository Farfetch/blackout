import type { Config } from '../../types';

export type GetBenefitsResponse = {
  id: string;
  code: string;
  isActive: boolean;
  metadata: Record<string, string>;
  benefitType: string;
};

export type GetBenefits = (config?: Config) => Promise<GetBenefitsResponse>;
