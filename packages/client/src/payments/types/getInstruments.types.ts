import type { Config } from '../../types';
import type { Instruments, Intent } from '.';

export type GetInstruments = (
  id: Intent['id'],
  config?: Config,
) => Promise<Instruments>;
