import type { Brand } from '../../brands/types/index.js';
import type { Category } from '../../categories/types/index.js';

export type ProductSizeGuide = {
  brand: {
    id: Brand['id'];
    name: Brand['name'];
  };
  maps: Array<{
    sizeScaleId: number;
    description: string;
    abbreviation: string;
    maps: Array<{
      description: string;
      position: number;
    }>;
    isDefault?: boolean;
    categoryId?: Category['id'];
  }>;
  annotations: string[];
  order: number;
};
