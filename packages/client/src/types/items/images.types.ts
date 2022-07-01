import type { ProductMeasurement } from '../..';

export type Image = {
  displayOrder?: number;
  order?: number;
  size: string;
  url: string;
  [k: string]: unknown;
};

export type LiveModel = {
  id: number;
  measurements: ProductMeasurement[];
  name: string;
  globalId: string;
};

export type ProductImageGroup = {
  images: Image[];
  liveModelId: number;
  liveModel: LiveModel;
  productSize: string;
  tag: string;
};

export type ImageGroup = {
  images: Image[];
  order: number;
};
