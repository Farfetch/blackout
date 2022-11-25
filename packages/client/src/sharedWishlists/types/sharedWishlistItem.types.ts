import type { Attribute, Color, ProductImageGroup } from '../..';
import type { Brand } from '../../brands/types';
import type { Label } from '../../types/items/label.types';
import type {
  Price,
  Product,
  ProductVariant,
  Size,
} from '../../products/types';
import type { ProductCategory } from '../../categories/types';

export type SharedWishlistItem = {
  id: number;
  productId: Product['result']['id'];
  productName: string;
  productDescription: string;
  merchantId?: number;
  brandId: Brand['id'];
  brandName: Brand['name'];
  quantity: number;
  isAvailable?: boolean;
  dateCreated: string;
  images?: ProductImageGroup;
  attributes?: Attribute[];
  variants?: ProductVariant[];
  categories?: ProductCategory[];
  colors?: Color[];
  sizes?: Size[];
  productSlug: string;
  isExclusive: boolean;
  isCustomizable: boolean;
  labels?: Label[];
  price?: Price;
  fulfillmentDate?: string | null;
};
