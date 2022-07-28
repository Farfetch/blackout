import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { SizeScale } from '../../sizeScales/types';

export type SizeGuide = {
  categoryId: Category['id'];
  brandId: Brand['id'] | null;
  description?: string;
  maps: {
    sizeScaleId: SizeScale['sizeScaleId'];
    description: string;
    abbreviation: string;
    maps: {
      description: string;
      position: number;
    }[];
    isDefault?: boolean;
    categoryId?: Category['id'];
  }[];
  annotations: string[];
};
