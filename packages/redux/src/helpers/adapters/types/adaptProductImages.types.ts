import type { Image } from '@farfetch/blackout-client';

type LegacyImages =
  | Array<{
      order: number;
      images: Image[];
    }>
  | {
      images: Image[];
      [k: string]: unknown;
    }
  | Image[];

export type AdaptProductImagesConfigData = {
  // Query parameter to be appended to each image URL, useful to set the image compression via site key, for example.
  productImgQueryParam?: string;
};

export type GenerateSourcesByOrder = (
  order: string,
  originalSources: Image[],
  config?: AdaptProductImagesConfigData,
) => {
  order: number;
  sources: Record<string, string>;
  [k: string]: unknown;
};

export type ProductImagesAdapted =
  | Array<
      Image & {
        order: number;
        sources: Record<string, string>;
      }
    >
  | undefined;

export type AdaptProductImages = (
  legacyImages?: LegacyImages,
  config?: AdaptProductImagesConfigData,
) => ProductImagesAdapted;
