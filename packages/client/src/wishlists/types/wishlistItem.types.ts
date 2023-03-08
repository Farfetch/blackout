import type { Attribute, Color, ProductImageGroup } from '../../index.js';
import type { Brand } from '../../brands/types/index.js';
import type { Label } from '../../types/items/label.types.js';
import type {
  Price,
  Product,
  ProductVariant,
  Size,
} from '../../products/types/index.js';
import type { ProductCategory } from '../../categories/types/index.js';

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
