import type { Attribute } from '../../types';

export type FullMeasurement = {
  description: string;
  value: number;
  unit: string;
  measureTypeId: string;
  unitClass: string;
  unitClassDescription: string;
};

export type ProductVariantMeasurement = {
  attributes: Attribute[];
  measurements: FullMeasurement[];
};
