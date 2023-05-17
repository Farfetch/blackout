import { INITIAL_STATE as DETAILS_INITIAL_STATE } from '../reducer/details.js';
import { get, isEmpty } from 'lodash-es';
import { normalize } from 'normalizr';
import { INITIAL_STATE as SIZES_INITIAL_STATE } from '../reducer/sizes.js';
import productSchema from '../../entities/schemas/product.js';
import type { ProductsServerInitialState } from './types/index.js';

/**
 * Converts server data for details of a product to store state.
 *
 * @param data - Params injected by the server.
 *
 * @returns Initial state for the product details reducer.
 */
const serverInitialState: ProductsServerInitialState = ({
  model,
  options: { productImgQueryParam } = {},
}) => {
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
    sizes,
    sizeSet,
    slug,
  } = model;
  const productInfo = {
    // Send this to the entity's `adaptProductImages`
    productImgQueryParam,
    // Data needed to support product information
    // Set attributes to undefined if the productAttributes array
    // is empty. This is because by default the server render will
    // return an empty array, even when no request to fetch the
    // product attributes was made.
    attributes: productAttributes?.length === 0 ? undefined : productAttributes,
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
