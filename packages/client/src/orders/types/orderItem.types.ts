import type {
  Attribute,
  Brand,
  Color,
  CreationChannel,
  MerchantOrderStatus,
  OrderItemStatus,
  Price,
  ProductCategory,
  ProductImageGroup,
  ProductType,
} from '../..';

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
  categories: ProductCategory[];
  colors: Color[];
  tags: string[];
  isExclusive?: boolean;
  isReturnAvailable: boolean;
  isPreOrder: boolean;
  preOrder?: {
    expectedFulfillmentDate: {
      startDate: string;
      endDate: string;
    };
    type: {
      type: string;
    };
    status: {
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
