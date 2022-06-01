import type { ProductEntity, WishlistItemEntity } from '../../entities/types';

type WishlistItemHashData = Partial<{
  merchant: number;
  merchantId: number;
  product: ProductEntity | undefined;
  productId: ProductEntity['id'];
  scale: number;
  size: WishlistItemEntity['size'] | number;
}>;

/**
 * Creates a hash based on the merchant, product and size, if any.
 *
 * @param data - The data needed to create a hash.
 *
 * @returns The hash created.
 */
const generateWishlistItemHash = (data: WishlistItemHashData): string => {
  // The left-hand side of the `||` operator is for the data received when
  // passed in the `buildWishlistItem` util; the right-hand side is for data
  // coming directly from the bag item
  const productId = data?.productId || data?.product?.id;
  const merchantId = data?.merchantId || data?.merchant;

  // Stop things right now if there is no product id
  if (!productId) {
    throw new Error('Item is missing the product id.');
  }

  // Initial data is from the `buildWishlistItem` util;
  // the reassignment in the `if` below s for data coming directly from the
  // bag item
  let sizeId = data.size;
  let scaleId = data.scale;

  if (typeof data.size === 'object') {
    sizeId = data.size.id;
    scaleId = data.size.scale;
  }

  // Printable values
  // Only add the merchant to the hash if there is size available
  // (this is because the `buildWishlistItem` only adds a `merchantId` if
  // there is any size)
  const merId = sizeId && merchantId ? merchantId : '';
  const szId = sizeId || '';
  const scId = scaleId || '';

  // The `!` is deliberately need even if there are no values between them;
  // this is to ensure the hash is really useful. For example,
  // for a product without size, the hash would be only the product id;
  // if we try to find something for the product id only, we may get
  // unwanted results, because there may be more than 1 product with that id
  // in the wishlist
  return `${productId}!${merId}!${szId}!${scId}`;
};

export default generateWishlistItemHash;
