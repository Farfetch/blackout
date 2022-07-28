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

export type WishlistItem = {
  attributes: Attribute[];
  brandId: Brand['id'];
  brandName: Brand['name'];
  categories: ProductCategory[];
  colors: Color[];
  createdByStaffMemberId: string | null;
  dateCreated: string;
  fulfillmentDate: string | null;
  id: number;
  images: ProductImageGroup;
  isAvailable: boolean;
  isCustomizable: boolean;
  isExclusive: boolean;
  labels: Label[];
  merchantId: number;
  merchantShoppingUrl: string | null;
  price: Price;
  productDescription: string;
  productId: Product['result']['id'];
  productName: string;
  productSlug: string;
  quantity: number;
  sizes: Size[];
  variants: ProductVariant[];
};
