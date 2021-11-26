import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { GenderEnum } from '../../types';
import type { SizeScale } from './sizeScale.types';

export type SizeScaleMappingsQuery = {
  gender?: GenderEnum;
  brand?: Brand['id'];
  sizeScale: SizeScale['sizeScaleId'];
  category: Category['id'];
};
