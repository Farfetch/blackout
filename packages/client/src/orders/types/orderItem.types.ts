import type {
  Attribute,
  Category,
  Color,
  CreationChannel,
  ItemStatus,
  Price,
  ProductImageGroup,
  ProductVariant,
} from '../..';

export type OrderItem = {
  attributes: Attribute[];
  brandName: string;
  brandId: number;
  checkoutOrderId: number;
  creationChannel: CreationChannel;
  id: number;
  images: ProductImageGroup;
  merchantId: number;
  merchantName: string;
  productId: number;
  productName: string;
  productSlug: string;
  quantity: number;
  status: ItemStatus;
  categories: Category[];
  variants: ProductVariant[];
  colors: Color[];
  tags: string[];
  promocodeDiscountPercentage: number;
  isExclusive: boolean;
  isPreOrder: boolean;
  preOrder: {
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
  shippingOrderId: string;
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
  price: Price;
  productAggregator: {
    id: number;
    images: ProductImageGroup;
    bundleSlug: string;
  };
};
