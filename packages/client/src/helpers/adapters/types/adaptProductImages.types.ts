export type Image = {
  displayOrder?: number;
  order?: number;
  size: string;
  url: string;
  [k: string]: unknown;
};

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

export type GenerateSourcesByOrder = (
  order: string,
  originalSources: Image[],
  config?: { productImgQueryParam?: string },
) => {
  order: number;
  sources: Record<string, string>;
  [k: string]: unknown;
};

export type ProductImagesAdapted =
  | Array<{
      order: number;
      sources: Record<string, string>;
    }>
  | LegacyImages
  | undefined;

export type AdaptProductImages = (
  legacyImages?: LegacyImages,
  config?: { productImgQueryParam?: string },
) => ProductImagesAdapted;
