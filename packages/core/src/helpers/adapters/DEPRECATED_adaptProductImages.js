import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';

/**
 * Classifies images under primary, secondary and details categories.
 *
 * @function
 * @memberof module:helpers/adapters
 *
 * @param {Array} resources - Image resources to be classified.
 * @param {object} contextualResources - Contextual resources to be used
 * together with the images.
 *
 * @example
 * const classifier = defaultClassifier(resouces, contextualResources);
 * Result of classifier === {
 *      primary: {
 *          sources: {
 *              250: 'https://cdn-images.farfetch.com/img_1_250.jpg',
 *              500: 'https://cdn-images.farfetch.com/img_1_500.jpg',
 *          },
 *          type: 'image'
 *      },
 *      secondary: {
 *          sources: { ... },
 *          type: 'image'
 *      },
 *      details: [
 *          { sources: { ... }, type: 'image' },
 *          { sources: { ... }, type: 'image' }
 *      ],
 *      contextual: {
 *          { sources: { ... }, type: 'image' }
 *      }
 *  };
 *
 * @returns {object} Object with images resources classified under their correct
 *  categories.
 */
export const defaultClassifier = (resources, contextualResources) => {
  const primary = resources[0];
  const secondary = resources[1];

  return {
    primary,
    secondary,
    details: resources.filter(
      media => media !== primary && media !== secondary,
    ),
    contextual: contextualResources,
  };
};

/**
 * (DEPRECATED) Returns an adapted object with all product images to be used on
 * multiple site areas.
 *
 * @function DEPRECATED_adaptProductImages
 * @memberof module:helpers/adapters
 *
 * @deprecated Since 1.0.0-next.29. Use adaptProductImages instead.
 *
 * @param {Array} legacyImages - All product images to be adapted.
 * @param {Function} [classifier=defaultClassifier()] - Helper function to
 * classify product images.
 * @param {object} [contextualStandardImages={}] - Contextual images to be used
 * together with the product.
 *
 * @example
 * const productImages = DEPRECATED_adaptProductImages(legacyImages);
 * Result of productImages === {
 *      contextual: {},
 *      primary: {
 *          sources: {
 *              250: 'https://cdn-images.farfetch.com/img_1_250.jpg',
 *              500: 'https://cdn-images.farfetch.com/img_1_500.jpg'
 *          },
 *          type: 'image'
 *      },
 *      secondary: {
 *          sources: { ... },
 *          type: 'image'
 *      },
 *      details: [{
 *          sources: {
 *              250: 'https://cdn-images.farfetch.com/img_3_250.jpg',
 *              ...
 *          },
 *          type: 'image'
 *     }]
 * };
 *
 * @returns {object} Product images object adapted to be used on multiple site
 * areas.
 */
export default (
  legacyImages,
  classifier = defaultClassifier,
  contextualStandardImages = {},
) => {
  if (!legacyImages) {
    return;
  }

  let imagesToUse = legacyImages;

  // Standardize the images coming from PDP
  if (!isEmpty(legacyImages) && isArray(legacyImages[0].images)) {
    imagesToUse = flatten(
      imagesToUse.map(item =>
        item.images.map(img => ({
          order: item.order,
          size: img.size,
          url: img.url,
        })),
      ),
    );
  }

  // NOTE: it should handle videos once the API supports it
  const groupedByPrefix = groupBy(imagesToUse, image =>
    get(image.url.match(/(.*?)\d+\.\w+$/), 1, ''),
  );
  const standardImages = reduce(
    groupedByPrefix,
    (standardImages, imagesToUse) => {
      standardImages.push({
        type: 'image',
        sources: fromPairs(
          imagesToUse.map(imgToUse => [imgToUse.size, imgToUse.url]),
        ),
      });

      return standardImages;
    },
    [],
  );

  return classifier(standardImages, contextualStandardImages);
};
