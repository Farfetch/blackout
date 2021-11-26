import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { Product } from '../../products/types';

type Attribute = {
  type: number;
  value: string;
  description: string;
};

type Label = {
  id: number;
  name: string;
  priority: number;
};

type Price = {
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

export type WishlistItem = {
  attributes: Attribute[];
  brandId: Brand['id'];
  brandName: Brand['name'];
  categories: Category[];
  colors: Array<{
    color: {
      id: number;
      name: string;
    };
    tags: string[];
  }>;
  createdByStaffMemberId: string | null;
  dateCreated: string;
  fulfillmentDate: string | null;
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
      measurements: Array<{
        description: string;
        unit: string;
        value: number;
      }> | null;
      name: string;
    };
    productSize: string;
    tag: string;
  };
  isAvailable: boolean;
  isCustomizable: boolean;
  isExclusive: boolean;
  labels: Label[];
  merchantId: number;
  merchantShoppingUrl: string | null;
  price: Price;
  productDescription: string;
  productId: Product['result']['id'];
  productName: string;
  productSlug: string;
  quantity: number;
  sizes: Array<{
    isOneSize: boolean;
    scale: string;
    scaleAbbreviation: string;
    sizeDescription: string;
    sizeId: string;
    variants: Array<{
      barcodes: string[];
      formattedPrice: string;
      formattedPriceWithoutDiscount: string;
      merchantId: number;
      priceInclTaxes: number;
      priceInclTaxesWithoutDiscount: number;
      quantity: number;
    }>;
  }>;
  variants: Array<{
    attributes: Attribute[];
    availableAt: number[];
    barcodes: string[];
    id: string;
    isOneSize: boolean;
    merchantId: number;
    price: Price;
    purchaseChannel: number;
    quantity: number;
    scale: string;
    scaleAbbreviation: string;
    size: string;
    sizeDescription: string;
  }>;
};
