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

/**
 * The result of fetching a product detail page.
 */
export type Product = {
  breadCrumbs: BreadCrumb[];
  colorSet: Array<{
    productId: number;
    name: string;
    url: string;
    image: string;
  }>;
  colorSwatch: string;
  sizeSet: Array<{
    productId: number;
    url: string;
    volumeLabel: string;
  }>;
  complementaryInformation: Array<{
    key: string;
    title: string;
    value: string;
  }>;
  currencyIsoCode: string;
  imageGroups: Array<{
    order: number;
    images: Array<{
      size: string;
      url: string;
      order: number;
    }>;
  }>;
  liveModel: {
    id: number;
    measurements: Array<{
      description: string;
      unit: string;
      value: number;
    }>;
    name: string;
    globalId: string;
  };
  productSize: string;
  price: Price;
  productRef: string;
  result: {
    brand: Brand;
    brandStyleId: string;
    categories: Category[];
    compositions: Array<{
      material: string;
      productId: number;
      productPart: string;
      value: string;
    }>;
    colors: Array<{
      color: {
        id: number;
        name: string;
      };
      tags: string[];
    }>;
    care: Array<{
      instruction: string;
      value: string;
    }>;
    description: string;
    gender: GenderEnum;
    id: number;
    images: {
      images: Array<{
        order: number;
        size: string;
        url: string;
      }>;
      liveModel: {
        id: number;
        measurements: ProductMeasurement[];
        name: string;
        globalId: string;
      };
      productSize: string;
      tag: string;
    };
    measurements: ProductMeasurement[];
    season: {
      id: number;
      name: string;
    };
    shortDescription: string;
    tag: ProductTagEnum;
    tagDescription: string;
    variants: ProductVariant[];
    videos: Array<{
      order: number;
      url: string;
    }>;
    hasParentProduct: boolean;
    parentProductId: number;
    preferedMerchant: {
      byAttribute: Array<{
        merchantId: number;
        type: string;
        value: string;
      }>;
      merchantId: number;
    };
    madeIn: string;
    isOnline: boolean;
    isExclusive: boolean;
    translatedAttributes: string;
    customAttributes: string;
    isCustomizable: boolean;
    styleId: number;
    scaleId: number;
    labels: Array<{
      id: number;
      name: string;
      priority: number;
    }>;
    fulfillmentDate: string;
    variations: Array<{
      values: Array<{
        type: string;
        property: {
          id: string;
          value: string;
        };
      }>;
      products: Array<{
        id: number;
        order: number;
        isDefault: boolean;
        varianId: string;
      }>;
    }>;
    type: ProductTypeEnum;
    sku: string;
    associationsInformation: {
      hasColorGrouping: boolean;
    };
    associations: Array<{
      id: number;
      type: ProductTypeEnum;
    }>;
    digitalAssets: Array<{
      mediaType: string;
      displayOrder: number;
      size: string;
      url: string;
      type: DigitalAssetTypeEnum;
    }>;
    promotions: Array<{
      id: string;
      name: string;
    }>;
  };
  selectedSize: string;
  sizes: Size[];
  relatedSets: Array<{
    setId: number;
    setType: number;
  }>;
  slug: string;
  redirectInfo: {
    url: string;
    responseCode: number;
  };
  scaleId: number;
  // Model properties
  productAttributes?: string[];
  recommendedSet?: number;
};
