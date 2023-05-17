import type { Brand } from '../../brands/types/index.js';
import type { Category } from '../../categories/types/index.js';
import type { SizeScale } from '../../sizeScales/types/index.js';

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
