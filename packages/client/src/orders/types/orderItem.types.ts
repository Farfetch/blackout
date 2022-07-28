import type {
  Attribute,
  Color,
  CreationChannel,
  OrderItemStatus,
  OrderStatus,
  Price,
  ProductCategory,
  ProductImageGroup,
} from '../..';

export type OrderItem = {
  attributes: Attribute[];
  creationChannel: CreationChannel;
  id: number;
  images: ProductImageGroup;
  merchantId: number;
  productId: number;
  productSlug: string;
  orderStatus: OrderStatus;
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
  merchantOrderCode: string;
};
