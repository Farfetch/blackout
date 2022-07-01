import type {
  Attribute,
  Color,
  Gender,
  Label,
  ProductImageGroup,
} from '../../types';
import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';
import type { Price, Product, ProductVariant, Size } from '../../products';

export type BagItem = {
  id: number;
  productId: Product['result']['id'];
  productName: string;
  productDescription: string;
  merchantId: number;
  merchantName: string;
  brandId: Brand['id'];
  brandName: string;
  quantity: number;
  isAvailable: boolean;
  dateCreated: string;
  images: ProductImageGroup;
  attributes: Attribute[];
  customAttributes: string;
  merchantShoppingUrl: string;
  variants: ProductVariant[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  productSlug: string;
  isExclusive: boolean;
  isCustomizable: boolean;
  fulfillmentInfo: {
    isPreOrder: boolean;
    fulfillmentDate: string | null;
  };
  labels: Label[];
  promotionDetail: {
    totalDiscountPercentage: number | null;
    totalDiscountValue: number | null;
    formattedTotalDiscountValue: string;
    isProductOffer: boolean;
  };
  type: number;
  price: Price;
  productAggregator: {
    id: number;
    bundleSlug: string;
    images: ProductImageGroup;
  } | null;
  gender: Gender;
};
