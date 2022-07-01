import type {
  Attribute,
  Brand,
  Category,
  Color,
  CreationChannel,
  ItemStatus,
  Price,
  Product,
  ProductImageGroup,
  ProductVariant,
} from '../..';

export type CheckoutOrderItem = {
  attributes: Attribute[];
  brandName: string;
  brandId: Brand['id'];
  checkoutOrderId: number;
  creationChannel: CreationChannel;
  id: number;
  images: ProductImageGroup;
  merchantId: number;
  merchantName: string;
  productId: Product['result']['id'];
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
    id?: number;
    images: ProductImageGroup;
    bundleSlug: string;
  };
};
