import type {
  Brand,
  Color,
  MerchantOrderStatus,
  MerchantOrderStatusLegacy,
  OrderItemCreationChannel,
  OrderItemCreationChannelLegacy,
  OrderItemStatus,
  OrderItemStatusLegacy,
  Price,
  ProductCategoryWithGenderDescription,
  ProductImageGroup,
  ProductType,
  ProductVariantAttribute,
} from '../../index.js';

import { type SaleIntent } from '../../types/common/index.js';

export type ShippingService = {
  description: string;
  id: number;
  name: string;
  type: string;
  minEstimatedDeliveryHour?: number;
  maxEstimatedDeliveryHour?: number;
  trackingCodes?: string[];
};

export type OrderItem = {
  attributes: ProductVariantAttribute[];
  brand: Brand;
  creationChannel: OrderItemCreationChannel;
  id: number;
  images: ProductImageGroup;
  merchantId: number;
  merchantOrderCode: string;
  merchantOrderId: number;
  productId: number;
  productSlug: string;
  orderStatus: MerchantOrderStatus;
  orderItemStatus: OrderItemStatus;
  categories: ProductCategoryWithGenderDescription[];
  colors: Color[];
  tags: string[];
  isExclusive?: boolean;
  isReturnAvailable: boolean;
  isExchangeAvailable?: boolean;
  isPreOrder: boolean;
  preOrder?: {
    expectedFulfillmentDate?: {
      startDate?: string;
      endDate?: string;
    };
    type?: {
      type: string;
    };
    status?: {
      type: string;
    };
  };
  productSummary: {
    productId: string;
    description: string;
    shortDescription: string;
    productAggregator?: string;
  };
  shippingOrderId: string;
  shippingOrderLineId: string;
  isCustomizable: boolean;
  gift?: {
    to: string;
    from: string;
    message: string;
  };
  size: string;
  price: Price;
  productAggregator?: {
    id: number;
    images: ProductImageGroup;
    bundleSlug: string;
  };
  returnRestriction?: string;
  shippingService: ShippingService;
  customAttributes: string | null;
  shortDescription: string;
  productType: keyof typeof ProductType;
  metadata?: Record<string, string>;
  expectedFulfillmentDate?: string;
  saleIntent?: SaleIntent | string;
};

// This type is for the `getGuestOrderLegacy` client
// that still uses the legacy endpoint. This type
// should be removed when the `getGuestOrderLegacy` client is removed.
export type OrderItemLegacy = Omit<
  OrderItem,
  'creationChannel' | 'orderItemStatus' | 'orderStatus' | 'productType'
> & {
  creationChannel: OrderItemCreationChannelLegacy;
  orderItemStatus: OrderItemStatusLegacy;
  orderStatus: MerchantOrderStatusLegacy;
  productType: ProductType;
};
