import type { ProductEntity } from '../../entities/types/index.js';

export type BuildWishlistItemData = {
  // Product with all its information.
  product: ProductEntity;
  // Quantity to add to the wishlist.
  quantity?: number;
  // Selected product size to add to the wishlist.
  size?: {
    // Size id.
    id: number;
    // Size scale id.
    scale: number;
  };
  // Selected product old size to add to the wishlist.
  oldSize?: {
    // Old size id.
    id: number;
    // Old size scale id.
    name?: string;
  };
};

type BuildWishlistItem = (data: BuildWishlistItemData) => {
  merchantId?: number;
  productId: ProductEntity['id'];
  quantity: number;
  scale?: number;
  size?: number;
  oldSize?: {
    id: number;
    name?: string;
  };
};

/**
 * Build the wishlist item object ready to perform wishlist requests (add or
 * update).
 *
 * @param data - Details of the wishlist item to build.
 *
 * @returns Wishlist item object ready to wishlist requests.
 */
const buildWishlistItem: BuildWishlistItem = ({
  product,
  quantity = 1,
  size,
  oldSize,
}) => {
  const sizeId = size?.id;
  // If the sizeId is populated we can send the merchantID
  let merchantId;

  if (sizeId) {
    const sizeHydrated = product.sizes?.find(({ id }) => id === sizeId);

    merchantId = sizeHydrated?.stock[0]?.merchantId;
  }

  return {
    merchantId,
    productId: product.id,
    quantity,
    scale: size?.scale,
    size: sizeId,
    oldSize,
  };
};

export default buildWishlistItem;
