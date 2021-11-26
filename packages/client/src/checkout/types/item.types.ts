import type { Brand } from '../../brands/types';
import type { Product } from '../../products/types';

export enum AttributeType {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

export enum CreationChannel {
  Catalog,
  Mail,
  Phone,
}

export enum ItemStatus {
  Available,
  NoStock,
  NotEnoughStock,
}

export enum Gender {
  Woman,
  Man,
  Unisex,
  Kid,
}

export enum PurchaseChannel {
  AddToBag,
  EmailOnly,
  PhoneOnly,
  SuperCatalog,
}

export type Attribute = {
  type: AttributeType;
  value: string;
  description: string;
};

export type Images = {
  images: {
    order: number;
    size: string;
    url: string;
  }[];
  liveModelId: number;
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

export type Variant = {
  id: string;
  attributes: Attribute[];
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
  purchaseChannel: PurchaseChannel;
  quantity: number;
  size: string;
  scale: string;
  scaleAbbreviation: string;
  sizeDescription: string;
  isOneSize: boolean;
};

export type Item = {
  attributes: Attribute[];
  brandName: string;
  brandId: Brand['id'];
  checkoutOrderId: number;
  creationChannel: CreationChannel;
  id: number;
  images: Images;
  merchantId: number;
  merchantName: string;
  productId: Product['result']['id'];
  productName: string;
  productSlug: string;
  quantity: number;
  status: ItemStatus;
  categories: {
    id: number;
    name: string;
    parentId: number;
    gender: Gender;
  }[];
  variants: Variant[];
  colors: {
    color: {
      id: number;
      name: string;
    };
    tags: string[];
  }[];
  tags: string[];
  promocodeDiscountPercentage: number;
  isExclusive: boolean;
  customAttributes: string;
  isCustomizable: boolean;
  gift: {
    to: string;
    from: string;
    message: string;
  };
  fulfillmentInfo: {
    isPreOrder: boolean;
    fulfillmentDate: string;
  };
  size: string;
  scale: string;
  sizeDescription: string;
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
    images: Images;
    bundleSlug: string;
  };
};
