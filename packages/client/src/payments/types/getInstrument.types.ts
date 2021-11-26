import type { Config } from '../../types';
import type { Instrument, Intent } from '.';

export type GetInstrument = (
  id: Intent['id'],
  instrumentId: Instrument['id'],
  config?: Config,
) => Promise<Instrument>;
