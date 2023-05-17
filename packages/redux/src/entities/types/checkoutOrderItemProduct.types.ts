import type { CategoryEntity, MerchantEntity, ProductEntity } from './index.js';

export type CheckoutOrderItemProductEntity = Pick<
  ProductEntity,
  | 'categories'
  | 'colors'
  | 'customAttributes'
  | 'id'
  | 'images'
  | 'isCustomizable'
  | 'isExclusive'
  | 'merchant'
  | 'name'
  | 'price'
  | 'slug'
  | 'variants'
>;

export type CheckoutOrderItemProductEntityDenormalized = Omit<
  CheckoutOrderItemProductEntity,
  'categories' | 'merchant'
> & {
  categories: CategoryEntity[] | undefined;
  merchant: MerchantEntity | undefined;
  labels: ProductEntity['labels'];
};
