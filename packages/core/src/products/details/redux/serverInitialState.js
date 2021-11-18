import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import productSchema from '../../../entities/schemas/product';

/**
 * Converts server data for details of a product to store state.
 *
 * @function serverInitialState
 * @memberof module:products/details/reducer
 *
 * @param {object} data - Params injected by the server.
 * @param {object} data.model - Page model with product details data.
 * @param {object} data.options - General options for any modification.
 * @param {object} data.options.productImgQueryParam - Query parameter to be
 * appended to each product image URL.
 *
 * @returns {object} Initial state for the product details reducer.
 */
export default ({ model, options: { productImgQueryParam } = {} }) => {
  // Check if a model object is of a product detail page (type === 'Product')
  // - if not, do nothing
  if (isEmpty(model) || get(model, 'dataLayer.general.type') !== 'Product') {
    return { details: INITIAL_STATE };
  }

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
  const details = {
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
  const { result: id, entities } = normalize(details, productSchema);

  return {
    details: {
      attributes: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      colorGrouping: {
        currentPageIndex: {},
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      error: {},
      fittings: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      id,
      isHydrated: {
        [id]: true,
      },
      isLoading: {
        [id]: false,
      },
      measurements: {
        error: {},
        isLoading: {},
      },
      merchantsLocations: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      recommendedSets: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      sets: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      sizeguides: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      sizes: {
        error: {},
        isLoading: {
          [id]: false,
        },
      },
      sizeScale: {
        error: null,
        isLoading: {
          [id]: false,
        },
      },
    },
    entities,
  };
};
