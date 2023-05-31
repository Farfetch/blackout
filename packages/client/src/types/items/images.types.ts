import type { ProductMeasurement } from '../../index.js';

export type Image = {
  displayOrder?: number;
  order?: number;
  size: string;
  url: string;
  [k: string]: unknown;
};

export type LiveModel = {
  id: number;
  measurements?: ProductMeasurement[];
  name?: string;
  globalId?: string;
};

export type ProductImageGroup = {
  images: Image[];
  liveModelId: number | null;
  liveModel?: LiveModel | null;
  productSize?: string | null;
  tag?: string | null;
};

export type ImageGroup = {
  images: Image[];
  order: number;
};
