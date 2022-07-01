import type { Attribute, Size } from '@farfetch/blackout-client';

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
  attributes: Attribute[],
  sizes?: Size[],
) => AttributesAdapted;
