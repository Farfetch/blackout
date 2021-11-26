import type { Size, VariantAttribute } from '../../../products/types';

export type AttributesAdapted =
  | {
      id: number;
      name: string;
      scale: number;
      scaleDescription: string;
      scaleAbbreviation: string;
      globalQuantity: number;
    }
  | Record<string, never>;

export type AdaptAttributes = (
  attributes: VariantAttribute[],
  sizes?: Size[],
) => AttributesAdapted;
