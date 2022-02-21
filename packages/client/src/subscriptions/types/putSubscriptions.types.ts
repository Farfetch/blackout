import type { Config } from '../../types';
import type { Subscription } from '.';

export type PutSubscriptions = (
  data: Subscription,
  config?: Config,
) => Promise<Subscription[]>;
