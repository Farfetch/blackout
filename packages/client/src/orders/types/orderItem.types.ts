import type {
  Attribute,
  Brand,
  Color,
  CreationChannel,
  CreationChannelLegacy,
  MerchantOrderStatus,
  MerchantOrderStatusLegacy,
  OrderItemStatus,
  OrderItemStatusLegacy,
  Price,
  ProductCategoryWithGenderDescription,
  ProductImageGroup,
  ProductType,
} from '../../index.js';

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
  attributes: Attribute[];
  brand: Brand;
  creationChannel: CreationChannel;
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
};

// This type is for the `getGuestOrderLegacy` client
// that still uses the legacy endpoint. This type
// should be removed when the `getGuestOrderLegacy` client is removed.
export type OrderItemLegacy = Omit<
  OrderItem,
  'creationChannel' | 'orderItemStatus' | 'orderStatus' | 'productType'
> & {
  creationChannel: CreationChannelLegacy;
  orderItemStatus: OrderItemStatusLegacy;
  orderStatus: MerchantOrderStatusLegacy;
  productType: ProductType;
};
