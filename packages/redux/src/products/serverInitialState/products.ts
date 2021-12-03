import { INITIAL_STATE as DETAILS_INITIAL_STATE } from '../reducer/details';
import { normalize } from 'normalizr';
import { INITIAL_STATE as SIZES_INITIAL_STATE } from '../reducer/sizes';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import productSchema from '../../entities/schemas/product';
import type { Model, StoreState } from '../../types';

/**
 * Converts server data for details of a product to store state.
 *
 * @memberof module:products/reducer
 *
 * @param {object} data - Params injected by the server.
 * @param {object} data.model - Page model with product details data.
 * @param {object} data.options - General options for any modification.
 * @param {object} data.options.productImgQueryParam - Query parameter to be
 * appended to each product image URL.
 *
 * @returns {object} Initial state for the product details reducer.
 */
const serverInitialState = ({
  model,
  options: { productImgQueryParam } = {},
}: {
  model: Model;
  options?: { productImgQueryParam?: string };
}): {
  details: StoreState['products']['details'];
  entities?: StoreState['entities'];
  sizes: StoreState['products']['sizes'];
} => {
  // Check if a model object is of a product detail page (type === 'Product')
  // - if not, do nothing
  if (isEmpty(model) || get(model, 'dataLayer.general.type') !== 'Product') {
    return {
      details: DETAILS_INITIAL_STATE,
      sizes: SIZES_INITIAL_STATE,
    };
  }

  // Only passing specifically the properties that we see fit,
  // instead of spreading everything and end up with unnecessary data that
  // will only increase the payload/store.
  const {
    breadCrumbs,
    colorSet,
    colorSwatch,
    complementaryInformation,
    imageGroups,
    liveModel,
    price,
    productAttributes,
    productRef,
    productSize,
    recommendedSet,
    relatedSets,
    result: productData,
    scaleId,
    sizes,
    sizeSet,
    slug,
  } = model;
  const productInfo = {
    // Send this to the entity's `adaptProductImages`
    productImgQueryParam,
    // Data needed to support product information
    attributes: productAttributes,
    breadCrumbs,
    colorSet,
    colorSwatch,
    complementaryInformation,
    imageGroups,
    liveModel,
    price,
    productRef,
    productSize,
    recommendedSet,
    relatedSets,
    // @ts-expect-error scaleId is duplicated on product payload
    scaleId,
    sizes,
    sizeSet,
    slug,
    ...productData,
    // The model already brings a `measurements` entry,
    // which is different from the
    // '/api/products/{id}/variantsMeasurements' response.
    // Thus, we need to override it since it'll always be requested async.
    measurements: undefined,
  };
  const { result: id, entities } = normalize(productInfo, productSchema);

  return {
    details: {
      error: {},
      id,
      isHydrated: {
        [id]: true,
      },
      isLoading: {
        [id]: false,
      },
    },
    entities,
    sizes: {
      error: {},
      isLoading: {
        [id]: false,
      },
    },
  };
};

export default serverInitialState;
