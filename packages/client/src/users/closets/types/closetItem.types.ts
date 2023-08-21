import type { Brand } from '../../../brands/index.js';
import type {
  Color,
  PagedResponse,
  ProductImageGroup,
  ProductVariantAttribute,
} from '../../../types/index.js';
import type { Order } from '../../../orders/index.js';
import type { Price, Product } from '../../../products/index.js';
import type { ProductCategory } from '../../../categories/index.js';

export type ClosetItems = PagedResponse<ClosetItem>;

export type ClosetItem = {
  id: string;
  orderId: Order['id'];
  merchantId: number;
  productId: Product['result']['id'];
  productName: string;
  productDescription: string;
  attributes: ProductVariantAttribute[];
  images: ProductImageGroup;
  categories: ProductCategory[];
  colors: Color[];
  price: Price;
  purchasePrice: Price;
  brand: Brand;
  customAttributes: string;
  isAvailable: boolean;
  createdDate: string;
};
