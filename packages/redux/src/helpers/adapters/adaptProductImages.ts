import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import type { AdaptProductImages, GenerateSourcesByOrder } from './types';
import type { Image } from '@farfetch/blackout-client';

/**
 * Returns the corresponding images sources by size for a given order.
 *
 * @example
 * ```
 * const productImagesOrder = generateSourcesByOrder(order, imagesSources);
 * productImagesOrder === {
 *      order: 1,
 *      sources: {
 *          250: 'https://cdn-images.farfetch.com/img_1_250.jpg',
 *          500: 'https://cdn-images.farfetch.com/img_1_500.jpg'
 *      },
 * };
 *
 * ```
 *
 * @param order           - The appearance order for the image sources.
 * @param originalSources - The original images sources, containing its size and URL.
 * @param config          - Additional configurations.
 *
 * @returns Object containing the order and sources collection, where each size has its own URL.
 */
const generateSourcesByOrder: GenerateSourcesByOrder = (
  order,
  originalSources,
  { productImgQueryParam } = {},
) => {
  let paramToAppend: string;

  if (!productImgQueryParam) {
    paramToAppend = '';
  } else if (productImgQueryParam.charAt(0) === '?') {
    paramToAppend = productImgQueryParam;
  } else {
    paramToAppend = `?${productImgQueryParam}`;
  }

  return {
    ...originalSources[0],
    order: parseInt(order, 10),
    sources: originalSources.reduce(
      (sources, { url, size }) => ({
        ...sources,
        [size]: `${url}${paramToAppend}`,
      }),
      {},
    ),
  };
};

/**
 * Returns an object with all product images grouped by its order, to be used on
 * multiple site areas.
 *
 * @example
 * ```
 * const productImages = adaptProductImages(legacyImages);
 * Result of productImages === [
 *      {
 *          order: 1,
 *          sources: {
 *              '250': 'https://cdn-images.farfetch.com/img_1_250.jpg',
 *              '500': 'https://cdn-images.farfetch.com/img_1_500.jpg',
 *              ...
 *          },
 *      },
 *      {
 *          order: 2,
 *          sources: {
 *              '250': 'https://cdn-images.farfetch.com/img_2_250.jpg',
 *              '500': 'https://cdn-images.farfetch.com/img_2_500.jpg',
 *              ...
 *          },
 *      },
 *      {
 *          ...
 *      }
 * ];
 *
 * ```
 *
 * @param legacyImages - All product images to be adapted.
 * @param config       - Additional configurations.
 *
 * @returns Product images list adapted to be used on multiple site areas.
 */
const adaptProductImages: AdaptProductImages = (
  legacyImages,
  { productImgQueryParam } = {},
) => {
  if (!legacyImages) {
    return;
  }

  if (!isEmpty(legacyImages)) {
    // Adapt `imageGroups` parameter provided by PDP API response
    // Format: [{ order: 1, images: [{ size: x, url: y }, ... ]}, { ... }]
    // @ts-expect-error Property legacyImages can be an object.
    if (isArray(legacyImages[0]?.images)) {
      // @ts-expect-error Property legacyImages can be an object.
      return legacyImages.map(({ order, images }) =>
        generateSourcesByOrder(order, images, { productImgQueryParam }),
      );
    }

    // Adapt `images` parameter provided by API response on listing,
    // wishlist, bag, ...
    // Format: [{ order: 1, size: x, url: y }, ...]
    // Note that the `colorGrouping`'s `digitalAssets` has a `displayOrder`
    // instead of `order`
    const groupedByOrder = groupBy(
      legacyImages,
      (image: Image) => image.order || image.displayOrder,
    );

    return Object.entries(groupedByOrder).map(([order, imagesSources]) =>
      generateSourcesByOrder(order, imagesSources as Image[], {
        productImgQueryParam,
      }),
    );
  }

  return legacyImages;
};

export default adaptProductImages;
