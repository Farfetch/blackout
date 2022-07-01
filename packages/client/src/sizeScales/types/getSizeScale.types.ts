import type { Config } from '../..';
import type { SizeScale } from './sizeScale.types';

export type GetSizeScale = (
  id: SizeScale['sizeScaleId'],
  config?: Config,
) => Promise<SizeScale>;
