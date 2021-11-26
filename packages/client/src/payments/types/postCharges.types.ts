import type { Config } from '../../types';
import type { Intent, PostChargesResponse } from '.';

export type PostChargesData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostCharges = (
  id: Intent['id'],
  data: PostChargesData,
  config?: Config,
) => Promise<PostChargesResponse>;
