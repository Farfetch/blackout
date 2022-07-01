import type { ProductEntity } from '.';

export type CheckoutOrderItemProductEntity = Pick<
  ProductEntity,
  | 'categories'
  | 'colors'
  | 'customAttributes'
  | 'description'
  | 'id'
  | 'images'
  | 'isCustomizable'
  | 'isExclusive'
  | 'merchant'
  | 'name'
  | 'price'
  | 'sizes'
  | 'slug'
  | 'variants'
>;
