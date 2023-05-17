import type { SizeVariant } from './sizeVariant.types.js';

export type Size = {
  sizeId: string;
  sizeDescription: string;
  scale: string;
  scaleAbbreviation?: string;
  isOneSize: boolean;
  variants: SizeVariant[];
};
