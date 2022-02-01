import type { GenderEnum } from '../../types';

export type OrderItem = {
  attributes: VariantAttribute;
  brandName: string;
  brandId: number;
  checkoutOrderId: number;
  creationChannel: CreationChannel;
  id: number;
  images: Images;
  merchantId: number;
  merchantName: string;
  productId: number;
  productName: string;
  productSlug: string;
  quantity: number;
  status: ItemStatus;
  categories: Category;
  variants: Variant;
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

export enum VariantAttributeTypeEnum {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

export type VariantAttribute = {
  type: VariantAttributeTypeEnum;
  value: string;
  description: string;
};

export enum CreationChannel {
  Catalog,
  Mail,
  Phone,
}

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

export enum ItemStatus {
  Available,
  NoStock,
  NotEnoughStock,
}

export type Category = {
  id: number;
  name: string;
  parentId: number;
  gender: GenderEnum;
  uuid?: string;
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

export type Attribute = {
  type: AttributeType;
  value: string;
  description: string;
};

export enum AttributeType {
  Size,
  SizeDescription,
  Scale,
  ScaleDescription,
  ScaleAbbreviation,
}

export enum PurchaseChannel {
  AddToBag,
  EmailOnly,
  PhoneOnly,
  SuperCatalog,
}
