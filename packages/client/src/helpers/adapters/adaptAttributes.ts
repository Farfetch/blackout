import isEmpty from 'lodash/isEmpty';
import type { AdaptAttributes, AttributesAdapted } from './types';
import type { Size } from '../../products/types';

/**
 * Convert legacy size attributes to an object.
 *
 * @function
 * @memberof module:helpers/adapters
 *
 * @param {Array} attributes - Attributes to adapt.
 * @param {Array} [sizes] - Sizes of the product to build the current size
 * attribute quantity.
 *
 * @returns {object} Object with size attributes adapted.
 */
const adaptAttributes: AdaptAttributes = (attributes, sizes) => {
  if (isEmpty(attributes) && isEmpty(sizes)) {
    return {};
  }

  const attributesAdapted = {} as AttributesAdapted;

  if (!isEmpty(attributes)) {
    attributes.forEach(attribute => {
      switch (attribute.type) {
        case 0: // Size
          attributesAdapted.id = Number(attribute.value);
          break;
        case 1: // SizeDescription
          attributesAdapted.name = attribute.value;
          break;
        case 2: // Scale
          attributesAdapted.scale = Number(attribute.value);
          break;
        case 3: // ScaleDescription
          attributesAdapted.scaleDescription = attribute.value;
          break;
        case 4: // ScaleAbbreviation
          attributesAdapted.scaleAbbreviation = attribute.value;
          break;
        default:
          break;
      }
    });
  }

  // If sizes are provided, find the current attribute size quantity to add
  // it to the attributes returned
  if (sizes && !isEmpty(sizes)) {
    const isOneSize = sizes[0]?.isOneSize;
    let currentSize;

    if (isOneSize) {
      // Manually build the size for a one size product
      currentSize = sizes[0] as Size;

      attributesAdapted.id = Number(currentSize.sizeId);
      attributesAdapted.name = currentSize.sizeDescription;
      attributesAdapted.scale = Number(currentSize.scale);
      attributesAdapted.scaleAbbreviation = currentSize.scaleAbbreviation;
    } else {
      // Otherwise use the given size
      currentSize = sizes.find(
        ({ sizeId }) => Number(sizeId) === attributesAdapted.id,
      );
    }

    // Find the global quantity after having the correct size built
    if (currentSize && currentSize.variants) {
      attributesAdapted.globalQuantity = currentSize.variants.reduce(
        (acc, variant) => acc + variant.quantity,
        0,
      );
    }
  }

  return attributesAdapted;
};

export default adaptAttributes;
