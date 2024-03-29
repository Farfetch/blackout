import type {
  Brand,
  CheckoutOrderItemStatus,
  Color,
  Metadata,
  OrderItemCreationChannelLegacy,
  Price,
  Product,
  ProductCategory,
  ProductImageGroup,
  ProductVariant,
  ProductVariantAttribute,
  SaleIntent,
} from '../../index.js';

export type CheckoutOrderItem = {
  attributes: ProductVariantAttribute[];
  brandId?: Brand['id'];
  brandName: string;
  categories: ProductCategory[];
  checkoutOrderId: number;
  colors: Color[];
  creationChannel: OrderItemCreationChannelLegacy;
  customAttributes?: string;
  fulfillmentInfo?: {
    isPreOrder?: boolean;
    fulfillmentDate?: string;
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
  price: Omit<
    Price,
    'formattedPriceWithoutCurrency' | 'formattedPriceWithoutDiscountAndCurrency'
  >;
  productAggregator: {
    id?: number;
    images: ProductImageGroup;
    bundleSlug?: string;
  };
  productId: Product['result']['id'];
  productName: string;
  productSlug: string;
  promocodeDiscountPercentage?: number;
  promotionDetail: {
    totalDiscountPercentage?: number;
    totalDiscountValue: number;
    formattedTotalDiscountValue: string;
    isProductOffer: boolean;
    promotionEvaluationItemId?: string;
  };
  quantity: number;
  scale: string;
  size: string;
  sizeDescription: string;
  status: CheckoutOrderItemStatus;
  tags: string[];
  variantId: string;
  variants: Array<
    Omit<ProductVariant, 'price'> & {
      price: Omit<ProductVariant['price'], 'taxType'>;
    }
  >;
  summary: {
    formattedGrandTotal: string;
    formattedSubTotalAmount: string;
    formattedSubTotalOriginalAmount: string;
    grandTotal: number;
    subTotalAmount: number;
    subTotalOriginalAmount: number;
  };
  selectedSaleIntent?: SaleIntent & string;
  metadata?: Metadata;
};
