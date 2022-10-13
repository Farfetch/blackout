import { SeoPageType, SeoSubPageType } from '@farfetch/blackout-client';
import type { GetProductSeoMetadataParams } from '../types';

const getProductSeoMetadataParams: GetProductSeoMetadataParams = product => {
  const {
    categories,
    price,
    name,
    shortDescription,
    brand,
    color,
    description,
    compositions,
  } = product;

  const {
    includingTaxesWithoutDiscount: formattedPrice,
    includingTaxes: formattedSalePrice,
  } = price?.formatted ?? {};

  const leafCategory = categories?.[categories?.length - 1]?.name;

  return {
    pageType: SeoPageType.Product,
    param: {
      ProductCategoryName: leafCategory,
      ProductCategory: leafCategory,
      ProductColor: color,
      ProductComposition1: compositions?.[0]?.material,
      ProductComposition2: compositions?.[1]?.material,
      ProductComposition3: compositions?.[2]?.material,
      ProductDescription: description || name,
      ProductName: name || shortDescription,
      ProductDesigner: brand?.name,
    },
    subPageType:
      formattedPrice !== formattedSalePrice
        ? SeoSubPageType.Sale
        : SeoSubPageType.Default,
  };
};

export default getProductSeoMetadataParams;
