import type { Config } from '../../index.js';
import type { Exchange } from './exchange.types.js';

export type GetExchange = (
  id: Exchange['id'],
  config?: Config,
) => Promise<Exchange>;
