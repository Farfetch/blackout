import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { GenderEnum } from '../../types';
import type { Product } from '../../products/types';

export type BagItem = {
  id: number;
  productId: Product['result']['id'];
  productName: string;
  productDescription: string;
  merchantId: number;
  merchantName: string;
  brandId: Brand['id'];
  brandName: string;
  quantity: number;
  isAvailable: boolean;
  dateCreated: string;
  images: {
    images: {
      order: number;
      size: string;
      url: string;
    }[];
    liveModel: {
      id: number;
      measurements: {
        description: string;
        unit: string;
        value: number;
      }[];
      name: string;
      globalId: string;
    };
    productSize: string;
    tag: string;
  };
  attributes: {
    type: number;
    value: string;
    description: string;
  }[];
  customAttributes: string;
  merchantShoppingUrl: string;
  variants: {
    id: string;
    attributes: {
      type: number;
      value: string;
      description: string;
    }[];
    availableAt: number[];
    merchantId: number;
    price: {
      priceExclTaxes: number;
      priceInclTaxes: number;
      priceInclTaxesWithoutDiscount: number;
      discountExclTaxes: number;
      discountInclTaxes: number;
      discountRate: number;
      taxesRate: number;
      taxesValue: number;
      tags: string[];
      formattedPrice: string;
      formattedPriceWithoutDiscount: string;
      formattedPriceWithoutCurrency: string;
      formattedPriceWithoutDiscountAndCurrency: string;
      taxType: string;
    };
    formattedPrice: string;
    formattedPriceWithoutDiscount: string;
    purchaseChannel: number;
    barcodes: string[];
    quantity: number;
    size: string;
    scale: string;
    scaleAbbreviation: string;
    sizeDescription: string;
    isOneSize: boolean;
  }[];
  categories: {
    id: Category['id'];
    name: Category['name'];
    parentId: Category['id'];
    gender: GenderEnum;
  }[];
  colors: {
    color: {
      id: number;
      name: string;
    };
    tags: string[];
  }[];
  sizes: {
    sizeId: string;
    sizeDescription: string;
    scale: string;
    scaleAbbreviation: string;
    isOneSize: boolean;
    variants: {
      merchantId: number;
      formattedPrice: string;
      formattedPriceWithoutDiscount: string;
      quantity: number;
      barcodes: string[];
      priceInclTaxes: number;
      priceInclTaxesWithoutDiscount: number;
    }[];
  }[];
  productSlug: string;
  isExclusive: boolean;
  isCustomizable: boolean;
  fulfillmentInfo: {
    isPreOrder: boolean;
    fulfillmentDate: string | null;
  };
  labels: {
    id: number;
    name: string;
    priority: number;
  }[];
  promotionDetail: {
    totalDiscountPercentage: number | null;
    totalDiscountValue: number | null;
    formattedTotalDiscountValue: string;
    isProductOffer: boolean;
  };
  type: number;
  price: {
    priceExclTaxes: number;
    priceInclTaxes: number;
    priceInclTaxesWithoutDiscount: number;
    discountExclTaxes: number;
    discountInclTaxes: number;
    discountRate: number;
    taxesRate: number;
    taxesValue: number;
    tags: string[];
    formattedPrice: string;
    formattedPriceWithoutDiscount: string;
    formattedPriceWithoutCurrency: string;
    formattedPriceWithoutDiscountAndCurrency: string;
    taxType: string;
  };
  productAggregator: {
    id: number;
    bundleSlug: string;
    images: {
      images: {
        order: number;
        size: string;
        url: string;
      }[];
      liveModel: {
        id: number;
        measurements: {
          description: string;
          unit: string;
          value: number;
        }[];
        name: string;
        globalId: string;
      };
      productSize: string;
      tag: string;
    };
  } | null;
  gender: GenderEnum;
};
