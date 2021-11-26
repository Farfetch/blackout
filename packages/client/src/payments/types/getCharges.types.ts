import type { Charge, Intent } from '.';
import type { Config } from '../../types';

export type GetCharges = (
  id: Intent['id'],
  chargeId: string,
  config?: Config,
) => Promise<Charge>;
