import type {
  Attribute,
  Brand,
  CheckoutOrderItemStatus,
  Color,
  CreationChannelLegacy,
  Price,
  Product,
  ProductCategory,
  ProductImageGroup,
  ProductVariant,
} from '../..';

export type CheckoutOrderItem = {
  attributes: Attribute[];
  brandId?: Brand['id'];
  brandName: string;
  categories: ProductCategory[];
  checkoutOrderId: number;
  colors: Color[];
  creationChannel: CreationChannelLegacy;
  customAttributes: string;
  fulfillmentInfo: {
    isPreOrder: boolean;
    fulfillmentDate: string;
  };
  gift?: {
    to: string;
    from: string;
    message: string;
  };
  id: number;
  images: ProductImageGroup;
  isCustomizable: boolean;
  isExclusive: boolean;
  merchantId: number;
  merchantName: string;
  price: Price;
  productAggregator: {
    id?: number;
    images: ProductImageGroup;
    bundleSlug: string;
  };
  productId: Product['result']['id'];
  productName: string;
  productSlug: string;
  promocodeDiscountPercentage: number;
  quantity: number;
  scale: string;
  size: string;
  sizeDescription: string;
  status: CheckoutOrderItemStatus;
  tags: string[];
  variantId: string;
  variants: ProductVariant[];
  summary: {
    formattedGrandTotal: string;
    formattedSubTotalAmount: string;
    formattedSubTotalOriginalAmount: string;
    grandTotal: number;
    subTotalAmount: number;
    subTotalOriginalAmount: number;
  };
  promotionDetail: {
    totalDiscountValue: number;
    isProductOffer: boolean;
    formattedTotalDiscountValue: string;
  };
};
