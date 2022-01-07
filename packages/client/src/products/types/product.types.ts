import type { Brand } from '../../brands/types';
import type { BreadCrumb } from './breadCrumb.types';
import type { Category } from '../../categories/types';
import type { GenderEnum } from '../../types';
import type { Price } from './price.types';
import type { ProductMeasurement } from './productMeasurement.types';
import type { ProductTagEnum } from './productTagEnum.types';
import type { ProductTypeEnum } from './productTypeEnum.types';
import type { ProductVariant } from './productVariant.types';
import type { Size } from './size.types';

enum DigitalAssetTypeEnum {
  Default,
  ItemSwatch,
}

enum MerchantAttributeTypeEnum {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

/**
 * The result of fetching a product detail page.
 */
export type Product = {
  breadCrumbs: BreadCrumb[];
  colorSet: Array<{
    image: string;
    name: string;
    productId: number;
    url: string;
  }>;
  colorSwatch: string;
  complementaryInformation: Array<{
    key: string;
    title: string;
    value: string;
  }>;
  currencyIsoCode: string | null;
  imageGroups: Array<{
    images: Array<{
      order: number;
      size: string;
      url: string;
    }>;
    order: number;
  }>;
  liveModel: {
    globalId: string;
    id: number;
    measurements: Array<{
      description: string;
      unit: string;
      value: number;
    }>;
    name: string;
  };
  price: Price;
  productAttributes?: string[];
  productRef: string | null;
  productSize: string;
  recommendedSet?: number;
  redirectInfo: {
    url: string;
    responseCode: number;
  } | null;
  relatedSets: Array<{
    setId: number;
    setType: number;
  }>;
  result: {
    associations: Array<{
      id: number;
      type: ProductTypeEnum;
    }> | null;
    associationsInformation: { hasColorGrouping: boolean };
    brand: Brand;
    brandStyleId: string;
    care: Array<{
      instruction: string;
      value: string;
    }>;
    categories: Category[];
    colors: Array<{
      color: { id: number; name: string };
      tags: string[];
    }>;
    compositions: Array<{
      material: string;
      productId: number;
      productPart: string | null;
      value: string;
    }>;
    customAttributes: string | null;
    description: string;
    digitalAssets: Array<{
      displayOrder: number;
      mediaType: string;
      size: string;
      type: DigitalAssetTypeEnum;
      url: string;
    }>;
    fulfillmentDate: string | null;
    gender: GenderEnum;
    hasParentProduct: boolean;
    id: number;
    images: {
      images: Array<{
        order: number;
        size: string;
        url: string;
      }>;
      liveModel: {
        globalId: string;
        id: number;
        measurements: ProductMeasurement[];
        name: string;
      };
      productSize: string;
      tag: string;
    };
    isCustomizable: boolean;
    isExclusive: boolean;
    isOnline: boolean;
    labels: Array<{
      id: number;
      name: string;
      priority: number;
    }>;
    madeIn: string;
    measurements: ProductMeasurement[];
    parentProductId: number;
    preferedMerchant: {
      byAttribute: Array<{
        merchantId: number;
        type: MerchantAttributeTypeEnum;
        value: string;
      }>;
      merchantId: number;
    };
    promotions: Array<{
      id: string;
      name: string;
    }> | null;
    scaleId: number;
    season: {
      id: number;
      name: string | null;
    };
    shortDescription: string;
    sku: string | null;
    styleId: number;
    tag: ProductTagEnum;
    tagDescription: string;
    translatedAttributes: string | null;
    type: ProductTypeEnum;
    variants: ProductVariant[];
    variations: Array<{
      products: Array<{
        id: number;
        isDefault: boolean;
        order: number;
        varianId: string;
      }>;
      values: Array<{
        property: {
          id: string;
          value: string;
        };
        type: string;
      }>;
    }>;
    videos: Array<{
      order: number;
      url: string;
    }>;
  };
  scaleId: number;
  selectedSize: string | null;
  sizes: Size[];
  sizeSet: Array<{
    productId: number;
    url: string;
    volumeLabel: string;
  }> | null;
  slug: string;
};
