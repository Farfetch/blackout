import type { SizeVariant } from './sizeVariant.types';

export type Size = {
  sizeId: string;
  sizeDescription: string;
  scale: string;
  scaleAbbreviation: string;
  isOneSize: boolean;
  variants: SizeVariant[];
};
