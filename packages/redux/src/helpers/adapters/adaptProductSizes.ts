import get from 'lodash/get';
import type {
  AdaptProductSizes,
  ComposePurchaseChannels,
  GetAttributesBySizeId,
} from './types';
import type { ProductVariant, Size } from '@farfetch/blackout-client';

/**
 * Generate an object with a composed key like size#scale#merchantId, which will be
 * unique per product/merchant.
 *
 * @example
 * ```
 * const purchaseChannels = composePurchaseChannels(variants);
 * Result of purchaseChannels === {
 *      '21#206#10973': 0,
 *      '23#206#10973': 0,
 *      '25#206#10973': 0,
 *      '27#206#10973': 0
 *  }
 *
 * ```
 *
 * @param variants - [[]] Product variants to add additional info to sizes.
 *
 * @returns With keys (size#scale#merchantId), where the value represents a purchaseChannel.
 */
export const composePurchaseChannels: ComposePurchaseChannels = variants => {
  const purchaseChannels: Record<string, number> = {};

  variants.forEach(variant => {
    purchaseChannels[`${variant.size}#${variant.scale}#${variant.merchantId}`] =
      variant.purchaseChannel;
  });

  return purchaseChannels;
};

/**
 * Construct attributes for a given size, using the respective variant.
 *
 * @example
 * ```
 * const attributes = getAttributesBySizeId(sizeId, variants);
 * Result of attributes === {
 *     Size: '23',
 *     SizeDescription: '37',
 *     Scale: '206',
 *     ScaleDescription: 'Italy',
 *     ScaleAbbreviation: 'IT'
 * }
 *
 * ```
 *
 * @param sizeId   - Size id.
 * @param variants - Variants to fill the respective size attributes.
 *
 * @returns Size attributes of the given size.
 */
export const getAttributesBySizeId: GetAttributesBySizeId = (
  sizeId,
  variants,
) => {
  const variant: ProductVariant | undefined = variants.find(
    variant => variant.size === sizeId,
  );

  if (!variant) {
    return {};
  }

  return variant.attributes.reduce(
    (result, attribute) => ({
      ...result,
      [attribute.description]: attribute.value,
    }),
    {},
  );
};

/**
 * Returns a array with all sizes adapted to fit all site areas, for the sake of
 * consistency.
 *
 * @example
 * ```
 * const sizes = adaptProductSizes(sizes, variants);
 * Result of sizes === [
 *      {
 *          id: 21,
 *          isOneSize: false,
 *          name: '36',
 *          scale: 206,
 *          scaleAbbreviation: 'IT',
 *          scaleDescription: 'Italy',
 *          stock: [{
 *              merchantId: 10973,
 *              quantity: 1,
 *              price: { formatted: [Object] },
 *              purchaseChannel: 0
 *          }]
 *      },
 *      {
 *          id: 27,
 *          isOneSize: false,
 *          name: '39',
 *          scale: 206,
 *          scaleAbbreviation: 'IT',
 *          scaleDescription: 'Italy',
 *          stock: {...}
 *      }
 *  ];
 *
 * ```
 *
 * @param sizes    - Product sizes to adapt.
 * @param variants - [[]] Product variants to add additional info to sizes.
 *
 * @returns Sizes adapted.
 */
const adaptProductSizes: AdaptProductSizes = (sizes, variants = []) => {
  if (!sizes) {
    return;
  }

  let stock = [];
  // Variants are only used to hydrate stock with additional info (purchaseChannel).
  const purchaseChannels = composePurchaseChannels(variants);

  return sizes.map((size: Size) => {
    stock =
      size.variants &&
      size.variants.map(variant => ({
        barcodes: variant.barcodes,
        merchantId: variant.merchantId,
        price: {
          formatted: {
            includingTaxes: variant.formattedPrice,
            includingTaxesWithoutDiscount:
              variant.formattedPriceWithoutDiscount,
          },
        },
        purchaseChannel: get(
          purchaseChannels,
          `${size.sizeId}#${size.scale}#${variant.merchantId}`,
          null,
        ),
        quantity: variant.quantity,
      }));

    // Find scale description on size attributes
    const scaleDescription = getAttributesBySizeId(
      size.sizeId,
      variants,
    ).ScaleDescription;

    // Check the stock per variant
    const globalQuantity =
      stock && stock.reduce((acc, variant) => acc + variant.quantity, 0);

    return {
      globalQuantity,
      id: Number(size.sizeId),
      isOneSize: size.isOneSize,
      isOutOfStock: globalQuantity === 0,
      name: size.sizeDescription,
      scale: Number(size.scale),
      scaleAbbreviation: size.scaleAbbreviation,
      scaleDescription,
      stock,
    };
  });
};

export default adaptProductSizes;
