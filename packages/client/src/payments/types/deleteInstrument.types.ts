import type { Config } from '../../types';
import type { Instrument, Intent } from '.';

export type DeleteInstrument = (
  id: Intent['id'],
  instrumentId: Instrument['id'],
  config?: Config,
) => void;
