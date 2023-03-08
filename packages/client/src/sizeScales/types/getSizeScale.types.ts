import type { Config } from '../../index.js';
import type { SizeScale } from './sizeScale.types.js';

export type GetSizeScale = (
  id: SizeScale['sizeScaleId'],
  config?: Config,
) => Promise<SizeScale>;
