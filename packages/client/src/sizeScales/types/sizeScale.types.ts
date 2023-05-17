import type { Category } from '../../categories/types/index.js';

export type SizeScale = {
  sizeScaleId: number;
  description: string;
  abbreviation: string;
  maps: {
    description: string;
    position: number;
  }[];
  isDefault: boolean;
  categoryId: Category['id'];
};
