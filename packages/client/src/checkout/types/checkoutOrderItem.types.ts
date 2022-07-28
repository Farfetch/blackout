import type {
  Attribute,
  Brand,
  Color,
  CreationChannel,
  ItemStatus,
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
  creationChannel: CreationChannel;
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
  status: ItemStatus;
  tags: string[];
  variants: ProductVariant[];
};
