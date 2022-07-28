import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { GenderCode } from '../../types';
import type { SizeScale } from './sizeScale.types';

export type SizeScaleMappingsQuery = {
  gender?: GenderCode;
  brand?: Brand['id'];
  sizeScale: SizeScale['sizeScaleId'];
  category?: Category['id'];
};
