import type { VariantAttribute } from './variantAttribute.types';

export type ProductVariantMeasurement = {
  attributes: VariantAttribute[];
  measurements: Array<{
    description: string;
    value: number;
    unit: string;
    measureTypeId: string;
    unitClass: string;
    unitClassDescription: string;
  }>;
};
