import type { ProductEntity } from '../../entities/types';

export type BuildWishlistItemData = {
  product: ProductEntity;
  quantity?: number;
  size?: {
    id: number;
    scale: number;
  };
  oldSize?: {
    id: number;
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
 * Build the wishlist item object ready to perform wishlist requests
 * (add or update).
 *
 * @memberof module:wishlists/utils
 *
 * @param {object} data - Details of the wishlist item to build.
 * @param {object} data.product - Product with all its information.
 * @param {object} [data.size={}] - Selected product size to add to the wishlist.
 * @param {object} [data.size.id] - Size id.
 * @param {object} [data.size.scale] - Size scale id.
 * @param {number} [data.quantity=1] - Quantity to add to the wishlist.
 * @param {object} [data.oldSize={}] - Selected product old size to add to the wishlist.
 * @param {object} [data.oldSize.id] - Size id.
 * @param {object} [data.oldSize.name] - Size scale id.
 *
 * @returns {object} Wishlist item object ready to wishlist requests.
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
