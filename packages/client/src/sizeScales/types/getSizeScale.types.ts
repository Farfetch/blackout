import type { SizeScale } from './sizeScale.types';

export type GetSizeScale = (
  id: SizeScale['sizeScaleId'],
  config?: Record<string, unknown>,
) => Promise<SizeScale>;
